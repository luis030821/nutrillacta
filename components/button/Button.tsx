import React from "react";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  center?: boolean;
  icon?: React.ReactNode;
  gradient?: string;
}

const Button: React.FC<IButton> = ({
  secondary = false,
  center = false,
  icon,
  className = "",
  children,
  gradient,
  ...props
}) => {
  const Print = () => {
    if (icon && children) {
      // Si icon y children están presentes, mostrar ambos
      return (
        <div className="flex items-center">
          <div className="mr-1">{icon}</div>
          {children}
        </div>
      );
    } else if (icon) {
      // Si solo icon está presente, mostrar el icon
      return <>{icon}</>;
    } else if (children) {
      // Si solo children están presentes, mostrar los children
      return <>{children}</>;
    } else {
      // Si no se proporciona ni icon ni children, no se mostrará nada
      return null;
    }
  };
  return (
    <>
      <>
        {secondary ? (
          <button
            {...props}
            className={`border-[1px] border-paleta-900/40  relative inline-flex items-center overflow-hidden rounded-[6px] ${
              children == undefined ? "px-2" : "px-5"
            }  py-2 text-paleta-900/70 ${className} `}
          >
            <span className="relative  text-sm   font-bold lg:font-semibold flex items-center text-center mx-auto ">
              <Print />
            </span>
          </button>
        ) : (
          <button
            {...props}
            className={` bg-paleta-100 relative inline-flex items-center overflow-hidden duration-300 active:scale-95  ${
              children == undefined ? "px-2" : "px-5"
            }  py-2  rounded-[8px] ${className} `}
          >
            <span className="text-white text-sm font-bold lg:font-semibold transition-all duration-200 flex items-center text-center mx-auto ">
              <Print />
            </span>
          </button>
        )}
      </>
    </>
  );
};

export default Button;
// shadow-[10px_9px_22px_rgba(20,78,227,0.38)]
