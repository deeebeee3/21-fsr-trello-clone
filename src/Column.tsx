//import { FC } from "react";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";

import { Card } from "./Card";

import { addTask, moveTask, moveList, setDraggedItem } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { isHidden } from "./utils/isHidden";
import { DragItem } from "./DragItem";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

/* ColumnProps1, ColumnProps2 and ColumnProps3, are ways we can specify children as 
a prop to non FC type component / function */
type ColumnProp1 = {
  text: string;
  children?: React.ReactNode;
  id: string;
};

/* this is equivalent to ColumnProps1 but creates a type intersection equivalent to ColumnProps3 */
type ColumnProps2 = React.PropsWithChildren<{ text: string; id: string }>;

type ColumnProps3 = {
  text: string;
  id: string;
} & {
  children?: React.ReactNode;
};

/* this is another way we could define that our function can have children as a prop */
/* specify function as FC type and pass ColumnProps as type in Generic */
/* export const Column:FC<ColumnProps> = ({ text, id, children }) => { */

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    },
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark={true}
      />
    </ColumnContainer>
  );
};
