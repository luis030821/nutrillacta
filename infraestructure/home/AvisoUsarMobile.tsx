import { Icons } from "@llampukaq/icons";
import React, { useState, useEffect } from "react";

export default function AvisoUsarMobile() {
  const [show, setShow] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("dontShowAvisoUsarMobile");
    if (localStorageValue === "true") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  const handleDontShowAgainChange = () => {
    setDontShowAgain(!dontShowAgain);
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("dontShowAvisoUsarMobile", "true");
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="hidden lg:flex lg:flex-col fixed top-6 left-6 z-[99] rounded-[12px] overflow-hidden">
      <div className="flex bg-[#3d9d49] p-3 gap-3 text-white items-center relative">
        <div onClick={handleClose} className="absolute right-3 cursor-pointer">
          <Icons className="stroke-white/80" icon="IconX"></Icons>
        </div>
        <div>
          <Icons
            size={32}
            className="stroke-white"
            icon="IconInfoCircle"
          ></Icons>
        </div>
        <p className="font-medium text-[1.1rem]">Recomendación</p>
      </div>
      <div className="max-w-[350px] bg-paleta-200 p-5">
        Te recomendamos abrir esta página desde un teléfono móvil para disfrutar
        de una mayor experiencia.
        <div
          onClick={handleDontShowAgainChange}
          className="mt-4 flex items-center cursor-pointer"
        >
          <div
            className={` w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center ${
              dontShowAgain ? "bg-orange-500" : "bg-white"
            }`}
          >
            {dontShowAgain && (
              <div className="w-3 h-3 bg-white rounded-full"></div>
            )}
          </div>
          <span className="ml-2 text-sm text-gray-700">
            No volver a mostrar
          </span>
        </div>
      </div>
    </div>
  );
}
