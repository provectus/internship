import { useCallback, useState } from "react";

export const useToggle = (initialState:boolean): [boolean, ()=>void] => {
  const [isToggle, setToggle] = useState<boolean>(initialState);
  const toggle = useCallback(() => setToggle(!isToggle), [isToggle]);
  return [isToggle, toggle ]
}