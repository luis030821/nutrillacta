import { Icons } from "@/icons";
import React, { useState, useEffect } from "react";

const BotonDeMandaParaArriba: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollThreshold = 300;

      if (scrollY > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        id="botonArriba"
        className={`${
          showButton ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 fixed z-[4] bottom-[88px] right-2 border-2 border-paleta-300 bg-paleta-800 rounded-full flex items-center p-3`}
      >
        <button>
          <Icons
            size={32}
            className="stroke-paleta-300"
            icon="IconArrowNarrowUp"
          ></Icons>
        </button>
      </div>
    </>
  );
};

export default BotonDeMandaParaArriba;
