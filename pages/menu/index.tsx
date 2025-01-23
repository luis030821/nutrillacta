import { NextSeo } from "next-seo";
import { Category, Product, format, url } from "@/services/url";
import React, { useEffect, useState } from "react";
import { useData, withContext } from "@/context/withContext";
import TarjetaProductoVertical from "@/components/layout/TarjetaProductoVertical";
import ContadorDeTotalBebidasEnCategoria from "@/components/layout/ContadorDeTotalBebidasEnCategoria";
import Head from "next/head";
import BotonBuscarEnCatalogo from "@/components/button/BotonBuscarEnCatalogo";
import TarjetaProductoHorizontal from "@/components/layout/TarjetaProductoHorizontal";
import Img from "@/components/img/Img";
import SourceImg from "@/components/img/SourceImg";

import useMainContext from "@/context/useMainContext";
import CategoryItem from "@/infraestructure/menu/CategoryItem";

function Index() {
  const { onPc } = useMainContext();
  const { categories, products } = useData();
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const [verCuadricula, setverCuadricula] = useState(true);
  const [clicked, setclicked] = useState("");

  useEffect(() => {
    setSortedCategories([...categories]);
  }, [categories]);

  const eventoDeClickEnCategoria = (data: Category) => {
    const element = document.getElementById(
      `${format(`${data.title}categoria`)}`
    );
    if (element) {
      const yOffset = -212; // Ajusta este valor para el margen deseado
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setclicked(data.categoryId);
      // El retardo aquí debe coincidir con la duración de "smooth" para scrollIntoView
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Licorería Spondulus",
              url: "https://www.licoreriaspondylus.com",
            }),
          }}
        />
      </Head>
      <NextSeo
        title="Catálogo de nutrillacta | Nutrillacta"
        description={`Explora y disfruta las ${categories.length} categorias con más de ${products.length} tipos de licores, entre ellos: Cerveza, Whisky, Ron, Tequila, etc. Con los mejores precios en diferentes presentaciones, pídelos ahora y esperalos en la puerta de tu casa en menos de 30 minutos.`}
        canonical="https://www.licoreriaspondylus.com/menu"
      />

      <div
        id="limite-titulo"
        className="flex flex-col items-center justify-between pr-4 pt-1 "
      >
        <div className="flex gap-2 justify-between">
          <h1 className="p-3 text-[1.3rem] block">Catálogo de nutrillacta</h1>
        </div>
      </div>
      <div className="max-w-[1200px] lg:p-4 lg:shadow-md lg:justify-evenly lg:mx-auto items-stretch  w-full flex overflow-x-auto gap-x-3 bg-paleta-200 rounded-lg px-2 py-1 sticky top-[62px] lg:top-[126px] z-[3]">
        {sortedCategories.map((data, index) => (
          <CategoryItem
            key={index}
            data={data}
            index={index}
            eventoDeClickEnCategoria={eventoDeClickEnCategoria}
            clicked={clicked}
            onPc={onPc}
          />
        ))}
      </div>

      <div className="max-w-[1200px] lg:mx-auto ">
        <div className="px-3 py-2 flex flex-col   min-h-full mt-2">
          {categories.map((data, index) => (
            <div>
              <div
                id={`${format(`${data.title}categoria`)}`}
                itemProp="name"
                style={{
                  zIndex: 2 + index,
                }}
                className={`capitalize py-1 pl-3 rounded-[6px]  bg-white w-full font-bold justify-between  left-2  `}
              >
                <h2>
                  {data?.title}{" "}
                  <span className="font-mediun">
                    {" "}
                    (
                    <ContadorDeTotalBebidasEnCategoria
                      categoria={data?.categoryId}
                    />
                    )
                  </span>
                </h2>
              </div>
              <div
                itemScope
                itemType="https://schema.org/ItemList"
                className="flex flex-col justify-center overflow-auto"
              >
                {verCuadricula ? (
                  <>
                    <div
                      itemProp="itemListElement"
                      className={`relative h-max gap-2 grid grid-cols-2 lg:grid-cols-4 z-[0]     py-2 `}
                    >
                      {products
                        .filter((e) => e.categoryId == data.categoryId)
                        .map((product, index) => (
                          <>
                            {product.variants.map((variant, index) => (
                              <TarjetaProductoVertical
                                index={index}
                                key={index}
                                product={{ ...product, ...variant }}
                              />
                            ))}
                          </>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    {products
                      .filter((x) => x.categoryId == data.categoryId)
                      .map((e: Product, ind) => (
                        <TarjetaProductoHorizontal
                          index={ind}
                          product={{ ...e, ...e.variants[0] }}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withContext(Index);

export const getStaticProps = async () => {
  const products = await url("products");
  const cards = await url("cards");
  const categories = await url("categories");
  const value = {
    products,
    categories,
    cards,
  };
  return { props: value };
};
