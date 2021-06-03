import { nanoid } from "nanoid";
import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";

export type Task = { id: string; text: string };
export type List = { id: string; text: string; tasks: Task[] };
export type AppState = { lists: List[] };

export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);
      draft.lists[targetListIndex].tasks.push({ id: nanoid(), text });
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }

    default: {
      break;
    }
  }
};

/* We don’t need to return the new state value anymore, ImmerJS will handle it
automatically. Immer allows us to modify a draft copy of state, so it appears as
though we are mutating state directly - but we are not. Once we've modified our draft
immer will create a new copy of state */

/* "MOVE_LIST": take the draggedId and the hoverId from the action payload. Then we calculate the 
indices of the dragged and the hovered columns. And then we override the draft.lists 
value with the result of the moveItem function, which takes the source array, and two 
indices that it swaps. */
