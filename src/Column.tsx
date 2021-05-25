//import { FC } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";

import { Card } from "./Card";

import { addTask } from "./state/actions";

type ColumnProps = {
  text: string;
  id: string;
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

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark={true}
      />
    </ColumnContainer>
  );
};
