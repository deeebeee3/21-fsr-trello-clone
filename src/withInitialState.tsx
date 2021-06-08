import { useState, useEffect, ComponentType } from "react";
import { AppState } from "./state/appStateReducer";

type InjectedProps = { initialState: AppState };

/* this is a better solution than having to use a type assertion to cast props as TProps 
in the wrapped component... Instead we remove the injected props here */
type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  WrappedComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    });
    // ...
    return <WrappedComponent {...props} initialState={initialState} />;
  };
}

/* THE WHOLE POINT OF THIS.... we want our WrappedComponent to have the the original TProps 
it was passed, and we also want it to have the InjectedProps... which is why we are doing the 
union in the first place:

WrappedComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>

BUT.... BIG BUT, if TProps contains an initialState prop... we want to remove it first...
because we are injecting it right here in this HOC...

so thats why we are doing this first:

PropsWithoutInjected<TProps>

to remove "initialState if it was a prop in TProp...

MAKE SENSE???


*/
