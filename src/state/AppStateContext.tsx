import { createContext, Dispatch, useContext, useReducer, FC } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c1", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c2", text: "Begin to use static typing" }],
    },
  ],
};

/* Application Context section below */

/* these are the properties that our context must have */
type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

/* create the context, specifying it must have the above props */
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

/* Provider will make our context available to children components */
/* lists and getTasksById, were the props we said our context would have */
/* FC type defines that our function can have children as a prop */
/* FC is a generic type, so if we want other props along with children, we can pass them
to FC<> and then access them in our function, by default FC is FC<P={}> */
export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  const { lists } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

/* custom hook to make it easier to access application state from consuming components */
/* saves us from having to import useContext hook and AppStateContext in every 
consuming component. We can just import our custom useAppState hook :) */
export const useAppState = () => {
  return useContext(AppStateContext);
};
