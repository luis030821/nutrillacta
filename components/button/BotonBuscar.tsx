// import Icons from "@/styles/Icons";
// import React, { useState } from "react";
// const data_datos = [
//   {
//     title: { es: "Whisky Escocés", en: "Scotch Whisky" },
//     description: {
//       es: "Bebida alcohólica destilada originaria de Escocia.",
//       en: "Distilled alcoholic beverage originating in Scotland.",
//     },
//     productId: "001",
//     img: "url_del_whisky_escoces.jpg",
//     categoryId: "licores",
//     price: 50.99,
//     organizationId: "empresa_licorera",
//     created: 2021,
//     cardId: "whisky_escoces",
//   },
//   {
//     title: { es: "Ginebra", en: "Gin" },
//     description: {
//       es: "Bebida alcohólica destilada con enebro y otros botánicos.",
//       en: "Distilled alcoholic beverage flavored with juniper and other botanicals.",
//     },
//     productId: "002",
//     img: "url_de_la_ginebra.jpg",
//     categoryId: "licores",
//     price: 35.5,
//     organizationId: "empresa_licorera",
//     created: 2021,
//     cardId: "ginebra",
//   },
//   {
//     title: { es: "Ron", en: "Rum" },
//     description: {
//       es: "Bebida alcohólica destilada obtenida del jugo fermentado de la caña de azúcar.",
//       en: "Distilled alcoholic beverage obtained from the fermented juice of sugarcane.",
//     },
//     productId: "003",
//     img: "url_del_ron.jpg",
//     categoryId: "licores",
//     price: 25.75,
//     organizationId: "empresa_licorera",
//     created: 2021,
//     cardId: "ron",
//   },
//   {
//     title: { es: "Tequila", en: "Tequila" },
//     description: {
//       es: "Bebida alcohólica originaria de México elaborada a partir del agave.",
//       en: "Alcoholic beverage originating in Mexico made from the agave plant.",
//     },
//     productId: "004",
//     img: "url_del_tequila.jpg",
//     categoryId: "licores",
//     price: 40.25,
//     organizationId: "empresa_licorera",
//     created: 2021,
//     cardId: "tequila",
//   },
// ];

import { Product } from "@/services/url";
import { ChangeEvent, useEffect, useRef } from "react";
import Icons from "@/styles/Icons";
import { useState } from "react";
import { Icons as I } from "@/icons";
import TarjetaProductoHorizontal from "../layout/TarjetaProductoHorizontal";
import { Category, format } from "@/services/url";
import Link from "next/link";
import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";
export default function BotonBuscar({
  fromNav,
  products,
  categories,
  inyectarEnInput,
}: {
  fromNav: boolean;
  products?: Product[];
  categories?: Category[];
  inyectarEnInput?: string;
}) {
  const router = useRouter();
  const ref = useRef(null);
  const [usedButton, setusedButton] = useState(false);
  const [value, setValue] = useState<string>("");
  const [productAddedMenu, setproductAddedMenu] = useState<Product[]>();
  const [showPlaceholder, setshowPlaceholder] = useState("");
  const trendings = ["Queso", "Yogurt", "Mermelada"];
  useEffect(() => {
    if (!categories) return;
    const copyProducts = products;
    for (let index = 0; index < categories.length; index++) {
      //@ts-ignore
      copyProducts.push({
        title: `"` + categories[index].title + `" categoría`,
        categoryId: categories[index].title,
      });
    }
    setproductAddedMenu(copyProducts);

    const randomIndex = Math.floor(Math.random() * trendings.length);

    const randomTrending = trendings[randomIndex];
    setshowPlaceholder(randomTrending);
  }, []);
  useEffect(() => {
    if (inyectarEnInput != undefined && inyectarEnInput != "") {
      setValue(inyectarEnInput);
    }
  }, [inyectarEnInput]);

  const filteredProducts = productAddedMenu
    ?.filter((product) => {
      const formattedTitle = product.title
        .toLowerCase()
        .replace(/\s+|(.)\1+|["]/g, "$1");
      //@ts-ignore
      return formattedTitle.includes(
        value?.toLowerCase().replace(/\s+|(.)\1+|["]/g, "$1")
      );
    })
    .slice(0, 3);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setValue("");
      setusedButton(false);
    } else {
      setValue(e.target.value);
      if (e.target.value.split("").length === 0) {
        setusedButton(false);
      } else {
        setusedButton(true);
      }
    }
  };

  const clickSobreCerrarBusqueda = () => {
    setValue("");
    setusedButton(false);
  };
  useEffect(() => {
    const handleRouteChange = () => {
      clickSobreCerrarBusqueda();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleClickOutside = () => {
    // Your custom logic here
    clickSobreCerrarBusqueda();
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="relative flex items-center flex-col   w-full lg:w-full lg:mr-4 px-2">
      <div
        className={`input-buscar-boton z-[3] bg-white  rounded-[26px]  w-full border-2  hover:border-paleta-100  flex  items-center space-x-2 `}
      >
        <div
          className={`" w-12 h-12 flex justify-center  items-center rounded-full flex-shrink-0 fill-custom`}
        >
          <Icons
            icon="find"
            className={`m-1 ml-4 stroke-[#ccc] svg-find  `}
          ></Icons>
        </div>
        <div className="relative flex-col items-center justify-center w-full ">
          <input
            autoComplete="off"
            onChange={(e) => {
              handleInput(e);
            }}
            id={`${fromNav ? "input-buscar" : ""}"`}
            value={value}
            placeholder={""}
            type="text"
            className=" w-full outline-none z-[2] block bg-transparent input-text relative flex-col items-center justify-center w-full"
          />
          {value.length < 1 && (
            <div className="absolute top-0 z-[-1] flex gap-1 items-center text-[#ccc] ">
              <I size={18} className="stroke-[#ccc]" icon="IconTrendingUp"></I>{" "}
              {showPlaceholder}
            </div>
          )}
        </div>

        {usedButton && (
          <div
            onClick={() => clickSobreCerrarBusqueda()}
            className="w full h-full flex justify-center items-center  pr-4"
          >
            <div className="bg-paleta-900/30 rounded-full p-1">
              <I
                className="stroke-paleta-300 rotate-45 flex items-center"
                icon="IconPlus"
              ></I>
            </div>
          </div>
        )}
      </div>
      <>
        {value !== "" && (
          <div
            ref={ref}
            className=" absolute w-[97%] lg:w-[110%] lg:left-0 top-[60px] shadow-lg   bg-paleta-300  z-[5]   "
          >
            {filteredProducts !== undefined && filteredProducts?.length > 0 ? (
              <>
                {" "}
                {filteredProducts?.map((product, index) => {
                  if (product.show === "false") return;
                  if (
                    !product.variants &&
                    index < 1 &&
                    !product.grado &&
                    !product.variants
                  )
                    return (
                      <Link
                        href={`/menu/${format(product.categoryId)}`}
                        className="flex items-center justify-center pt-2 w-full text-[1.2rem] py-1 border border-paleta-800/30 "
                      >
                        Explorar {product?.title}
                      </Link>
                    );
                  if (!product.variants) return;

                  return (
                    <>
                      {product.variants.map((variant, index) => (
                        <TarjetaProductoHorizontal
                          product={{ ...product, ...variant }}
                          key={index} // Asegúrate de usar una clave única para cada elemento en el array mapeado
                        />
                      ))}
                    </>
                  );
                })}
                <div
                  onClick={() => clickSobreCerrarBusqueda()}
                  className="z-[0] mx-auto pt-2 pb-2 border-b-[1px] rounded-[6px] mt-1 border-x-[1px] border-t-[1px] border-paleta-800/20 flex w-full justify-center items-center"
                >
                  {" "}
                  <I icon="IconX"></I> Cerrar Búsqueda
                </div>
              </>
            ) : (
              <div className="p-3">
                <p>Al parecer no hay lo que buscas</p>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
}
