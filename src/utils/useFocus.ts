import { useRef, useEffect } from "react";

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};

/* We use the useEffect hook to trigger the focus on the input element. 
As we’ve passed an empty dependency array to the useEffect callback - 
it will be triggered ONLY when the component using our hook will be mounted. */

/* Immutable Ref / React.RefObject (can't reassign "current" property) */
/* Pass null  */
/* const immutableRef = useRef<HTMLInputElement | null>(null) */

/* Mutable Ref / React.MutableRefObject (can reassign "current" property) */
/* Don't pass null  */
/* const mutableRef = useRef<HTMLInputElement>() */

/* https://dmitripavlutin.com/react-useref-guide/ */
