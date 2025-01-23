import Img from "@/components/img/Img";
import { useData } from "@/context/withContext";
import { Category } from "@/services/url";
import React, { useEffect, useState } from "react";
import ProductosQueSeMuestranEnCategorias from "./ProductosQueSeMuestranEnCategorias";
import useMainContext from "@/context/useMainContext";
import P from "@/components/html/P";

export default function CategoriasOrden({
  eventoDeClickEnCatagoria,
  setisCategoriaClick,
  isCategoriaClick,
  categoriaSeleccionada,
}: {
  eventoDeClickEnCatagoria: any;
  setisCategoriaClick: any;
  isCategoriaClick: boolean;
  categoriaSeleccionada: Category;
}) {
  const { onPc } = useMainContext();
  const { categories, products } = useData();
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const [clicked, setclicked] = useState("");
  const [activateEffect, setactivateEffect] = useState(false);

  // Función para ordenar las categorías de manera inversa
  const reverseOrder = () => {
    setSortedCategories([...sortedCategories].reverse());
  };

  useEffect(() => {
    // Ordenar las categorías inicialmente en el montaje del componente
    setSortedCategories([...categories]);
    if (onPc) {
      if (categoriaSeleccionada) {
        setclicked(categoriaSeleccionada.categoryId);
      }
    }
  }, [categories, categoriaSeleccionada]);

  // Función para manejar el evento de clic en una categoría
  const eventoDeClickEnCategoria = (data: any) => {
    if (categoriaSeleccionada === data) return;
    setactivateEffect(true);
    //@ts-ignore

    const element = document.getElementById("categories-id");
    if (element) {
      if (!onPc) {
        const yOffset = -70; // Ajusta este valor para el margen deseado
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        const yOffset = -135;

        // if ((num < -50)) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        // }
      }
    }

    setTimeout(() => {
      eventoDeClickEnCatagoria(data);
      setTimeout(() => {
        setactivateEffect(false);
      }, 100);
    }, 200);
  };
  return (
    <div className="">
      <div className=" mb-2  flex justify-between">
        <h1
          id="categories-id"
          className="text-[1.2rem] lg:text-[1.6rem] font-bold text-paleta-900  "
        >
          Categorías
        </h1>
      </div>
      {sortedCategories.length > 1 ? (
        <div className="bg-white flex flex-col lg:flex-row lg:w-full  z-[8] ">
          {" "}
          <div className="bg-paleta-200 lg:min-h-[695px] lg:justify-evenly lg:bg-blaze-orange-50/80  lg:h-max w-full flex lg:flex-col lg:gap-5 lg:pt-3 lg:mt-2 lg:pb-2 overflow-x-auto gap-x-3 lg:w-max lg:min-w-[175px] rounded-lg  sticky top-[104px] lg:top-[142px] z-[3] ">
            {sortedCategories.map((data, index) => (
              <div
                onClick={() => {
                  eventoDeClickEnCategoria(data);
                  setclicked(data.categoryId);
                }}
                className="flex flex-col justify-center flex-shrink-0"
                key={index}
              >
                {!onPc && (
                  <div className="aspect-square relative rounded-full w-full max-w-[70px]  lg:max-w-full items-center justify-center flex flex-col py-1 overflow-hidden">
                    <Img
                      link
                      width={`${onPc ? "300" : "150"}`}
                      className={`rounded-full w-[68px] h-[68px] lg:h-[120px] lg:w-[120px] ${
                        data.categoryId === clicked
                          ? "border-2 border-paleta-100"
                          : ""
                      }`}
                      alt={`${data.title} categoria en Nutrillacta`}
                      src={data?.img?.src}
                    />
                  </div>
                )}

                <P
                  className={`cursor-pointer  lg:py-1 text-[.85rem] lg:text-[1.2rem] text-center lg:text-center capitalize  ${
                    data.categoryId === clicked
                      ? " lg:bg-white lg:w-max lg:px-4   lg:mx-auto lg:rounded-[12px]"
                      : ""
                  }`}
                >
                  {data?.title}
                </P>
              </div>
            ))}
          </div>
          <div
            className={`transition-opacity duration-150 lg:w-full ${
              activateEffect ? "opacity-0" : "opacity-100"
            }`}
          >
            {isCategoriaClick && (
              <ProductosQueSeMuestranEnCategorias
                setisCategoriaClick={setisCategoriaClick}
                categoriaSeleccionada={categoriaSeleccionada}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="animate-pulse min-h-[120px] bg-paleta-700 rouded-[10px]"></div>
        </>
      )}
    </div>
  );
}
