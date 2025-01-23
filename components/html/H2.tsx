import React, { HtmlHTMLAttributes } from "react";

interface PProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string; // Especificar que className es un string
  size?: "small" | "normal" | "medium";
}

export default function H2({ children, className = "", size }: PProps) {
  const sizeFinal = () => {
    switch (size) {
      case "small":
        return "text-[1.1rem] lg:text-[1.4rem]";
      case "normal":
        return "text-[.9rem] lg:text-[1rem]";
      case "medium":
        return "text-[1.5rem]  lg:text-[2rem] font-medium";
      default:
        return "text-[2rem] lg:text-[3rem] font-bold  ";
    }
  };

  return (
    <h2 className={`  text-pretty ${sizeFinal()} ${className} `}>{children}</h2>
  );
}
