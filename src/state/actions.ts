export type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_LIST";
      payload: {
        draggedId: string;
        hoverId: string;
      };
    };

/* 
We’ve defined the type alias Action and then we’ve passed two types separated 
by a vertical line to it. This means that the Action type now can resolve to 
one of the forms that we’ve passed. (discrimminated union).
*/

/* 
We could also define define the types in the union using the interface syntax:

interface AddListAction {
  type: "ADD_LIST";
  payload: string;
}

interface AddTaskAction {
  type: "ADD_LIST";
  payload: { text: string; listId: string };
}

type Action = AddListAction | AddTaskAction;
 */

/* Action creators - return a plain action object */
export const addList = (text: string): Action => ({
  type: "ADD_LIST",
  payload: text,
});

export const addTask = (text: string, listId: string): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId,
  },
});
