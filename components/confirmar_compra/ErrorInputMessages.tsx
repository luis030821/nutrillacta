import React from "react";

export default function ErrorInputMessages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-[.9rem] text-red-500 -mt-[9px]">{children}</p>;
}
