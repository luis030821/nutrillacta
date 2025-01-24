import TarjetaProductoVertical from "@/components/layout/TarjetaProductoVertical";
import useMainContext from "@/context/useMainContext";
import { useData } from "@/context/withContext";
import { Category, Product, format } from "@/services/url";
import { Icons as I } from "@/icons";

import React, { useState, useEffect } from "react";

export default function ProductosQueSeMuestranEnCategorias({
  categoriaSeleccionada,
  setisCategoriaClick,
}: {
  categoriaSeleccionada?: Category;
  setisCategoriaClick: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { onPc } = useMainContext();
  const { products } = useData();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.categoryId === categoriaSeleccionada?.categoryId
    );
    setFilteredProducts(filtered);
  }, [categoriaSeleccionada, products]);

  return (
    <div className="w-12/12 relative z-[2]  ">
      {!onPc && (
        <>
          <div className="absolute bg-gray-300 h-[calc(100%_-_24px)] left-[2px] top-[16px] w-[2px]"></div>
          <div className="absolute bg-gray-300 rounded-full bottom-[2px] h-[8px] w-[8px] left-[1px] z-[3]"></div>
          <div
            style={{ zIndex: 94 }}
            className="flex justify-between items-center bg-white sticky top-[195px]  ml-0 z-[2]"
          >
            <div className="absolute bg-gray-300 rounded-full top-[27px] h-[8px] w-[8px] left-[1px]"></div>
            <div className="absolute bg-gray-300 rounded-full bottom-0 h-[30px] w-[2px] left-[2px]"></div>
            <div className="flex  gap-1 items-center relative justify-start w-full pt-3 ">
              {/* <div className="w-full h-[2px] bg-gray-300"></div> */}
              <div className="flex items-center gap-2">
                <h1 className="capitalize  text-[1.1rem]  w-full pb-2  ml-3 text-center my-2">
                  {categoriaSeleccionada?.title}
                </h1>
                <div
                  className="flex justify-center items-center border rounded-full p-[2px] -mt-1"
                  onClick={() => setisCategoriaClick(false)}
                >
                  <I
                    size={16}
                    className="stroke-gray-600 rotate-45 flex items-center"
                    icon="IconPlus"
                  ></I>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex w-full items-center mb-[10px]"></div>
      <>
        <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-2 mx-auto  pl-4 ">
          {filteredProducts.map((product, index) => (
            <>
              {product.variants.map((productVarirant, index) => (
                <TarjetaProductoVertical
                  key={index}
                  index={index}
                  product={{ ...product, ...productVarirant }}
                />
              ))}
            </>
          ))}
        </div>
      </>
    </div>
  );
}
