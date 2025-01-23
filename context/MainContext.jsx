import React, { createContext, useEffect, useState } from "react";

export const MainContext = createContext({});

function MainContextComponent({ children }) {
  const [catalogoDeLicores, setcatalogoDeLicores] = useState([]);
  const [desdePc, setDesdePc] = useState(false);
  useEffect(() => {
    const categoriasAlcohol = [
      { nombre: "Cerveza", imagen: "/assets/png/catalogo/cerveza.png" },
      { nombre: "Whisky", imagen: "/assets/png/catalogo/whisky.png" },
      { nombre: "Ron", imagen: "/assets/png/catalogo/ron.png" },
      {
        nombre: "Vodka",
        imagen: "/assets/png/catalogo/vodka.png",
        contrast: true,
      },
      {
        nombre: "Champagne",
        imagen: "/assets/png/catalogo/champagne.png",
        contrast: true,
      },
      { nombre: "Tequila", imagen: "/assets/png/catalogo/tequila.png" },
    ];
    setcatalogoDeLicores(categoriasAlcohol);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setDesdePc(true);
      } else {
        setDesdePc(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Check the initial width
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainContext.Provider
      value={{ catalogoDeLicores: catalogoDeLicores, onPc: desdePc }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextComponent;
