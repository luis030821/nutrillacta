import TarjetaProductoVertical from "@/components/layout/TarjetaProductoVertical";
import useMainContext from "@/context/useMainContext";
import { useData } from "@/context/withContext";
import { Product, format } from "@/services/url";
import { Icons } from "@/icons";
import React, { useEffect, useState } from "react";

export default function ProductosPopulares() {
  const { products } = useData();
  const { onPc } = useMainContext();

  return (
    <>
      <div className="flex items-end justify-between lg:max-w-[1200px] lg:w-full lg:mx-auto ">
        <h2 className="text-[1.2rem] lg:text-[1.6rem] font-bold lg:font-semibold">
          Productos
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-[100%] gap-2 mx-auto lg:max-w-[1200px] lg:w-full lg:mx-auto ">
        {products.length > 1 ? (
          <>
            {products?.map((product, index) => {
              if (index > 3 && !onPc) return;
              if (index >= 4) return;
              return (
                <>
                  <TarjetaProductoVertical
                    index={0}
                    product={{ ...product, ...product.variants?.[0] }}
                    key={index}
                    usarSoloTarjeta
                    usarSoloTarjetaProducto={{
                      ...product,
                      ...product.variants?.[0],
                    }}
                    usarSoloTarjetaIndex={index}
                  />
                  {/* ))} */}
                </>
              );
            })}
          </>
        ) : (
          <div className="animate-pulse min-h-[890px] col-span-2 bg-paleta-700 rouded-[10px]"></div>
        )}
      </div>
    </>
  );
}
