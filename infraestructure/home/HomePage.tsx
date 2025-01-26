import BotonBuscar from "@/components/button/BotonBuscar";
import BotonDeMandaParaArriba from "@/components/button/BotonDeMandaParaArriba";
import Banners from "@/components/layout/Banners";
import { Category, format } from "@/services/url";
import { Icons as I, Icons } from "@/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoriasOrden from "./CategoriasOrden";

import useMainContext from "@/context/useMainContext";

import { useData } from "@/context/withContext";
import HomePageSeo from "@/seo/HomePageSeo";
import WhatsappButtonPc from "./WhatsappButtonPc";
import ProductosPopulares from "./ProductosPopulares";
function HomePage() {
  const { onPc } = useMainContext();
  const { categories, products } = useData();
  const [categoriaSeleccionada, setcategoriaSeleccionada] =
    useState<Category>();
  const [isCategoriaClick, setisCategoriaClick] = useState(false);

  useEffect(() => {
    if (onPc) {
      setcategoriaSeleccionada(categories[2]);
      setisCategoriaClick(true);
    }
  }, [onPc]);

  const eventoDeClickEnCatagoria = (e: Category) => {
    if (e == categoriaSeleccionada) return;
    setcategoriaSeleccionada(e);
    setisCategoriaClick(true);
  };

  return (
    <>
      <HomePageSeo />
      {!onPc && <BotonDeMandaParaArriba />}
      {onPc && <WhatsappButtonPc />}

      <div className={`pt-0 text-black space-y-3 max-w-full lg:px-2`}>
        {!onPc && (
          <BotonBuscar
            categories={categories}
            products={products}
            fromNav={false}
          />
        )}
        <Banners />
        <div className="px-3 lg:max-w-[1200px] lg:mx-auto ">
          <CategoriasOrden
            isCategoriaClick={isCategoriaClick}
            eventoDeClickEnCatagoria={eventoDeClickEnCatagoria}
            setisCategoriaClick={setisCategoriaClick}
            categoriaSeleccionada={
              categoriaSeleccionada ? categoriaSeleccionada : categories[2]
            }
          />
        </div>
        <div className="w-12/12 mx-auto space-y-4 p-3">
          <ProductosPopulares />

          <Link className="" href={"/menu"}>
            <button className="max-w-[1200px] lg:mt-12  mt-3 bg-paleta-800 relative items-center flex justify-center lg:just  w-full border mx-auto py-3 rounded-[6px] font-semibold overflow-hidden">
              <Icons
                size={100}
                className=" stroke-paleta-200 absolute left-1 rotate-[-6deg]"
                icon="IconChevronRight"
              ></Icons>
              <Icons
                size={100}
                className="stroke-paleta-200 absolute right-1 rotate-[6deg]"
                icon="IconChevronLeft"
              ></Icons>
              <h2 className="text-paleta-300">
                Mirar todo el catálogo
                <span className="hidden">en Nutrillacta</span>
              </h2>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
