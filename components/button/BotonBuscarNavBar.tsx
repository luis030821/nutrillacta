import { Icons } from "@llampukaq/icons";
import React, { useState } from "react";
import BotonBuscar from "./BotonBuscar";
import { useData } from "@/context/withContext";

export default function BotonBuscarNavBar() {
  const { products } = useData();
  const [isClick, setisClick] = useState(false);
  
  const handleClic = () => {
    setisClick(!isClick)
    setTimeout(() => {
        document.getElementById("input-buscar")?.focus();

    }, 100);
  };
  return (
    <div className="fixed top-0 w-[calc(100%_-_56px)] right-[60px] h-[64px] z-[4] max-w-[550px] mx-auto  flex items-center justify-end ">
      {isClick && (
        <div className=" p-2 w-full h-[66px]  top-0 left-0 z-[3]  flex  justify-start">
          <div className="bg-paleta-300 w-[calc(100%)] rounded-md">
            <BotonBuscar fromNav={true} />
          </div>
        </div>
      )}
      <div
        onClick={() => handleClic()}
        className="bg-paleta-100 rounded-full p-2  z-[3] "
      >
        <Icons className="stroke-paleta-300" icon="IconSearch"></Icons>
      </div>
    </div>
  );
}
