import React, { HtmlHTMLAttributes } from "react";

interface PProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string; // Especificar que className es un string
  size?: "small" | "normal" | "medium";
  style?: React.CSSProperties;
}

export default function P({ children, className = "", size, style }: PProps) {
  const sizeFinal = () => {
    switch (size) {
      case "small":
        return "text-[.65rem] lg:text-[.8rem]";
      case "normal":
        return "text-[.8rem] lg:text-[.9rem]";
      case "medium":
        return "text-[1rem]  lg:text-[1.2rem]  ";
      default:
        return "text-[.9rem] lg:text-[1.08rem]";
    }
  };

  return (
    <p style={style} className={` ${sizeFinal()} ${className} `}>
      {children}
    </p>
  );
}
