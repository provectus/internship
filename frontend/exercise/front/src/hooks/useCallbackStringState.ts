import { useCallback, useState } from "react"

export const useCallbackStringState = (initialState: string):[string , (id: string)=>void] => {
  const [string, setString] = useState(initialState);
  const setCurrentString = useCallback((value: string) => setString(value), []);
  return [string, setCurrentString]
}