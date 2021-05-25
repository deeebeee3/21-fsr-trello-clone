import { nanoid } from "nanoid";
import { Action } from "./actions";
import { findItemIndexById } from "../utils/arrayUtils";

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

    default: {
      break;
    }
  }
};

/* We don’t need to return the new state value anymore, ImmerJS will handle it
automatically. Immer allows us to modify a draft copy of state, so it appears as
though we are mutating state directly - but we are not. Once we've modified our draft
immer will create a new copy of state */
