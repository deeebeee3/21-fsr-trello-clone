import { useState, useEffect, ComponentType } from "react";
import { AppState } from "./state/appStateReducer";

/* First we define a type that will represent the props that we are injecting */
type InjectedProps = { initialState: AppState };

/* Here we say that WrappedComponent accepts an intersection type that contains 
the props from the type variable TProps and the props defined in the InjectedProps.
The TProps is defined as a type argument of our generic function withInitialState. 
This way if the component that we’ll wrap into withInitialState will receive some 
other props, TypeScript will use them as TProps. */
export function withInitialState<TProps>(
  WrappedComponent: ComponentType<TProps & InjectedProps>
) {
  /* Then inside our function, we return a nameless function component */

  /* This component should not accept the prop that we inject using this HOC. 
  We don’t want to let the user provide this prop, because our HOC already does it. 
  This is why we use a utility type Omit. It allows us to create a new type that 
  won’t have the keys of the InjectedProps type. */

  return (props: Omit<TProps, keyof InjectedProps>) => {
    const [initialState, setInitialState] = useState({
      lists: [],
      draggedItem: null,
    });

    // ...

    /* Then we return the WrappedComponent(in our app it will be AppStateProvider) 
    passing the initialState and the rest of the props to it. */
    return (
      <WrappedComponent {...(props as TProps)} initialState={initialState} />
    );
  };
}

/* Typescript does not see Omit<TProps, keyof InjectedProps> as a subset of TProps.
It treats it as a completely different type... Thats why we need to use a type
assertion to cast props back to TProps in the wrapped component:

 {...(props as TProps)} 

 otherwise Typescript will complain that there is ambiguity around what the Type of props is...


TProps !== Omit<TProps, keyof InjectedProps> & InjectedProps

*/
