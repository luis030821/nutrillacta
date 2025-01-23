import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/services/url";
import Icons from "@/styles/Icons";
import { Icons as I, IconsProvider } from "@llampukaq/icons";
import P from "../html/P";

function MensajesRandomProducto({
  producto,
  categoriaPertenece,
}: {
  producto: Product;
  categoriaPertenece: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [componentesAleatorios, setComponentesAleatorios] = useState([]);

  useEffect(() => {
    if (componentesAleatorios.length < 1) return;
    const tiempoAleatorio =
      Math.floor(Math.random() * (13000 - 6000 + 1)) + 6000;
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === componentesAleatorios.length - 1 ? 0 : prevIndex + 1
      );
    }, tiempoAleatorio);

    intervalRef.current = intervalId;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [componentesAleatorios.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.5s ease";
      containerRef.current.style.transform = `translateY(-${
        currentBannerIndex * 30
      }px)`;
    }
  }, [currentBannerIndex]);

  useEffect(() => {
    const componentesArray = [];

    if (producto?.top == 1) {
      componentesArray.push(
        <div
          key="top2"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <Icons className="w-6 h-6" icon="trophy"></Icons>
          <P size="small" className="text-[.7rem] lg:text-[.8rem]">
            <span className="">Top 1 en {categoriaPertenece}</span>{" "}
          </P>
        </div>
      );
    }

    if (producto?.oldPrice != 0 && producto?.oldPrice !== undefined) {
      componentesArray.push(
        <div
          key="descuento"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <I className="stroke-gray-600" size={14} icon="IconTag"></I>
          <P size="small" className="text-[.7rem] lg:text-[.8rem] pl-1">
            <span className="">
              <strong>
                {" "}
                $
                {(
                  Number(producto.oldPrice) - Number(producto.variants[0].price)
                ).toFixed(2)}{" "}
              </strong>
              de descuento
            </span>{" "}
          </P>
        </div>
      );
    }
    if (producto?.top == 1 || producto?.top == 2) {
      componentesArray.push(
        <div
          key="carrito"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <P size="small" className="text-[.7rem] lg:text-[.8rem]">
            En el carrito de {Math.floor(Math.random() * (21 - 2 + 1)) + 2}{" "}
            personas
          </P>
        </div>
      );
    }

    if (producto?.top == 2) {
      componentesArray.push(
        <div
          key="top1"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <P size="small" className="text-[.7rem] lg:text-[.8rem]">
            <span className="">
              #2 en <span className="capitalize">{categoriaPertenece}</span>{" "}
            </span>{" "}
          </P>
        </div>
      );
    }
    if (producto?.isPopular === "true") {
      componentesArray.push(
        <div
          key="codigo"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <P size="small" className="text-[.7rem] lg:text-[.8rem]">
            <span>Bastante popular</span>{" "}
          </P>
        </div>
      );
      componentesArray.push(
        <div
          key="codigo"
          className="h-[30px] flex-shrink-0 w-full flex items-center justify-center"
        >
          <P size="small" className="text-[.7rem] lg:text-[.8rem]">
            De lo mejor en <strong>{categoriaPertenece}</strong>{" "}
          </P>
        </div>
      );
    }

    function mezclarComponentes(array: any) {
      let newArray = array.slice(); // Hacemos una copia del array original
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Intercambiamos los elementos aleatoriamente
      }
      return newArray;
    }
    setComponentesAleatorios(mezclarComponentes(componentesArray));
  }, [producto]);

  return (
    <div className="text-[.7rem] absolute w-full bottom-0 -top-[30px] bg-transparent  z-[0]  flex gap-[0px] text-paleta-800 items-start ">
      {componentesAleatorios.length < 1 ? (
        <> </>
      ) : (
        <>
          <div className=" bg-[#ebebeb85]   relative flex w-full overflow-hidden">
            <div
              className="flex w-full flex-col h-[30px] text-gray-500" // Updated height to accommodate all banners
              ref={containerRef}
            >
              {componentesAleatorios.map((componente, index) => (
                <div key={index}>{componente}</div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(MensajesRandomProducto);
