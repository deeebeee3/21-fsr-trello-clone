type Item = {
  id: string;
};

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id);
};

/* (type constraint) guarantees that the items that we pass to the function 
have the fields defined on the extended type */

/* if we didn't extend (inherit) the Item type in the generic parameter, then we wouldn't
be able to use the Item type in our function. TS would complain that the id field is not 
defined on type TItem. */

export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  const item = array[from];

  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};

/* We want to be able to work with arrays with any kind of items in them, so we use a type 
variable TItem. First we store the item in the item constant.
We use the removeItemAtIndex function to remove the item from its original position
and then we insert it back to the new position using the insertItemAtIndex function. */

export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

/* use the spread operator to generate a new array with the portion before the 
index that we get using the slice method, and the portion after the index using the slice 
method with index + 1. */

export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number
) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

/* generate a new array from two slices of the original array. The difference is that we 
put the item between the array slices. */
