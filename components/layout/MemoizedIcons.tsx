import { Icons } from "@/icons";
import React from "react";

export const MemoizedIcon = React.memo(Icons, (prevProps, nextProps) => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.size === nextProps.size &&
    prevProps.className === nextProps.className
  );
});
