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
