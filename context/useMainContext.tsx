import React, { useContext } from "react";
import { MainContext } from "./MainContext";

interface CategoriaTragosInterfaz {
  nombre: string;
  imagen: string;
  contrast: boolean;
}

function useMainContext() {
  const { catalogoDeLicores, onPc } = useContext(MainContext) as {
    catalogoDeLicores: CategoriaTragosInterfaz[];
    onPc: boolean;
    token: string;
  };
  return {
    catalogoDeLicores,
    onPc,
  };
}

export default useMainContext;
