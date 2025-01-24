import React, { PropsWithChildren, createContext, useContext } from "react";
import { IconsProps } from ".";
//@ts-ignore
const IconContext = createContext();

function IconsProvider({
  value,
  children,
}: PropsWithChildren<{
  value?: Partial<IconsProps>;
}>) {
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

export { IconsProvider };

export function useIcons() {
  return useContext(IconContext) as Partial<IconsProps>;
}
