import { nanoid } from "nanoid";
import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

export type Task = { id: string; text: string };
export type List = { id: string; text: string; tasks: Task[] };

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

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
    case "MOVE_TASK": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;

      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId);

      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );
      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId)
        : 0;

      const item = draft.lists[sourceListIndex].tasks[dragIndex];

      // Remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);
      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      break;
    }

    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }

    default: {
      break;
    }
  }
};

/* We don???t need to return the new state value anymore, ImmerJS will handle it
automatically. Immer allows us to modify a draft copy of state, so it appears as
though we are mutating state directly - but we are not. Once we've modified our draft
immer will create a new copy of state */

/* "MOVE_LIST": take the draggedId and the hoverId from the action payload. Then we calculate the 
indices of the dragged and the hovered columns. And then we override the draft.lists 
value with the result of the moveItem function, which takes the source array, and two 
indices that it swaps. */
