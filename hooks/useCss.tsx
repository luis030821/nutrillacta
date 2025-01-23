import { useEffect } from "react";

const useCss = (styles: any) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);
};

export default useCss;
