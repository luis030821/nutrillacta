import React, { useEffect, useState } from "react";
import { BotonAgregarAlCarro } from "../button/BotonAgregarAlCarro";
import { useData } from "@/context/withContext";
import { Icons as I } from "@llampukaq/icons";
import Link from "next/link";
import Img from "@/components/img/Img";
import { Product, Variant, format } from "@/services/url";
import MensajesRandomProducto from "./MensajesRandomProducto";
import P from "../html/P";
import SourceImg from "../img/SourceImg";

export default function TarjetaProductoVertical({
  maxProduct = 99,
  categoriaSeleccionada,
  showPopular = false,
  product,
  index,
}: {
  maxProduct?: number;
  categoriaSeleccionada?: string | undefined;
  showPopular?: boolean;
  usarSoloTarjeta?: boolean;
  usarSoloTarjetaProducto?: Product | undefined;
  usarSoloTarjetaIndex?: number | undefined;
  product: Product & Variant;
  index: any;
}) {
  const { products } = useData();
  if (showPopular) {
    const filterProduct = products?.filter(
      (x) => product?.isPopular === "true"
    );

    return (
      <>
        {filterProduct?.map((product, index) => {
          if (product?.show === "false") return;
          if (index > 6) return;
          return (
            <>
              {product.variants.map((variant, index) => (
                <Tarjeta index={index} product={{ ...product, ...variant }} />
              ))}
            </>
          );
        })}
      </>
    );
  }
  if (!showPopular) {
    return <Tarjeta index={index} product={product} />;
  }

  return (
    <>
      {products
        .filter((x) => x.categoryId == categoriaSeleccionada)
        .map((x, index) => {
          if (index >= maxProduct) return;
          if (product?.show === "false") return;
          return <Tarjeta index={index} key={index} product={product} />;
        })}
    </>
  );
}

const Tarjeta: React.FC<{
  product: Product & Variant;
  showPopular?: boolean;
  index: any;
}> = ({ product, index }) => {
  const { categories } = useData();
  const categoriaPertenece = `${format(
    categories.find((e) => e.categoryId == product?.categoryId)?.title
  )}`;
  const formatTitle = (title: string) => {
    const words = title?.split(" ");
    if (words?.length > 2) {
      return (
        <>
          {words.slice(0, 2).join(" ")}
          <br />
          {words.slice(2).join(" ")}
        </>
      );
    }
    return title;
  };
  const isTopOne =
    product.top == 1 && product.variants[0].name === product.name;

  return (
    <div className="shrink-0 h-full flex-grow relative">
      <div
        id={`${format(product?.title)}`}
        className={`shadow-md ${
          isTopOne
            ? "border-blaze-orange-400 border-[2px]"
            : "border-paleta-600  border-[1px] "
        } overflow-hidden  relative h-full w-full flex rounded-[10px] `}
      >
        <div className="bg-white rounded-full absolute top-2 right-2 z-[1] p-1 min-h-[24px] min-w-[24px]">
          <I
            size={16}
            className={`${
              isTopOne ? "stroke-blaze-orange-400 " : "stroke-black"
            }`}
            icon="IconDots"
          ></I>
        </div>
        {isTopOne && (
          <div className="text-blaze-orange-400 text-[.9rem] lg:text-[1.1rem] top-[2%]  rounded-[5px] left-[2%] z-[2] absolute flex items-center justify-center">
            <svg
              width="129"
              height="128"
              viewBox="0 0 129 128"
              className="w-7 h-7 lg:w-8 lg:h-9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-blaze-orange-400"
                d="M65.5497 32.6528C65.4602 32.4581 65.3168 32.2932 65.1364 32.1776C64.9561 32.062 64.7463 32.0006 64.5321 32.0006C64.3179 32.0006 64.1082 32.062 63.9278 32.1776C63.7474 32.2932 63.604 32.4581 63.5145 32.6528L58.9321 42.592C58.8492 42.7633 58.7252 42.9114 58.5711 43.0231C58.4169 43.1348 58.2375 43.2065 58.0489 43.232L47.1753 44.5248C46.9633 44.5504 46.763 44.6362 46.5981 44.772C46.4332 44.9077 46.3106 45.0878 46.2447 45.2909C46.1788 45.4941 46.1723 45.7118 46.2261 45.9185C46.2798 46.1252 46.3916 46.3123 46.5481 46.4576L54.5865 53.888C54.7253 54.0199 54.829 54.1844 54.8883 54.3666C54.9475 54.5487 54.9603 54.7428 54.9257 54.9312L52.7881 65.664C52.7462 65.8738 52.7654 66.0913 52.8432 66.2906C52.9211 66.49 53.0544 66.6628 53.2275 66.7887C53.4005 66.9147 53.606 66.9883 53.8197 67.0011C54.0333 67.0139 54.2461 66.9652 54.4329 66.8607L63.9881 61.5168C64.1554 61.4271 64.3423 61.3802 64.5321 61.3802C64.7219 61.3802 64.9088 61.4271 65.0761 61.5168L74.6313 66.8607C75.4633 67.3279 76.4617 66.6048 76.2761 65.664L74.1449 54.9312C74.1103 54.7428 74.1231 54.5487 74.1824 54.3666C74.2416 54.1844 74.3453 54.0199 74.4841 53.888L82.5161 46.4576C82.6727 46.3123 82.7844 46.1252 82.8382 45.9185C82.8919 45.7118 82.8855 45.4941 82.8195 45.2909C82.7536 45.0878 82.631 44.9077 82.4661 44.772C82.3012 44.6362 82.1009 44.5504 81.8889 44.5248L71.0217 43.232C70.8319 43.2075 70.6512 43.1362 70.4959 43.0245C70.3406 42.9128 70.2156 42.7641 70.1321 42.592L65.5497 32.6528ZM102.9 51.2C102.9 56.6026 101.76 61.9444 99.5542 66.8762C97.3485 71.8081 94.127 76.219 90.1001 79.8208V112C90.0999 112.56 89.9526 113.111 89.6728 113.596C89.3931 114.082 88.9907 114.486 88.506 114.767C88.0213 115.048 87.4713 115.197 86.9109 115.199C86.3505 115.201 85.7995 115.056 85.3129 114.778L64.5001 102.886L43.6873 114.778C43.2007 115.056 42.6497 115.201 42.0893 115.199C41.5289 115.197 40.9789 115.048 40.4942 114.767C40.0095 114.486 39.6071 114.082 39.3274 113.596C39.0476 113.111 38.9003 112.56 38.9001 112V79.8208C34.1258 75.5505 30.4956 70.1538 28.3399 64.122C26.1843 58.0902 25.5718 51.615 26.5581 45.286C27.5445 38.957 30.0983 32.9752 33.9872 27.8855C37.8761 22.7957 42.9764 18.7596 48.8238 16.1447C54.6711 13.5297 61.0797 12.4191 67.466 12.9138C73.8522 13.4085 80.0133 15.4929 85.3881 18.9772C90.763 22.4615 95.1809 27.2349 98.2395 32.8629C101.298 38.4909 102.9 44.7946 102.9 51.2ZM64.5001 89.6C57.76 89.6016 51.1382 87.8292 45.3001 84.4607V106.49L62.9129 96.4224C63.3963 96.1462 63.9434 96.001 64.5001 96.001C65.0568 96.001 65.6039 96.1462 66.0873 96.4224L83.7001 106.496V84.4672C77.8614 87.8333 71.2396 89.6035 64.5001 89.6ZM64.5001 83.2C72.987 83.2 81.1264 79.8285 87.1275 73.8274C93.1287 67.8262 96.5001 59.6869 96.5001 51.2C96.5001 42.713 93.1287 34.5737 87.1275 28.5725C81.1264 22.5714 72.987 19.2 64.5001 19.2C56.0132 19.2 47.8739 22.5714 41.8727 28.5725C35.8715 34.5737 32.5001 42.713 32.5001 51.2C32.5001 59.6869 35.8715 67.8262 41.8727 73.8274C47.8739 79.8285 56.0132 83.2 64.5001 83.2Z"
              />
            </svg>
            #1
          </div>
        )}
        <div className="flex flex-col bg-gray-100/90 relative justify-center items-center w-full h-full">
          <Link
            href={{
              pathname: `/menu/[categoria]/[producto]`,
              query: {
                categoria: categoriaPertenece,
                producto: `${format(`${product?.title} ${product.name}`)}`,
              },
            }}
            className="relative min-w-full flex justify-center"
          >
            <div className=" h-auto mx-auto relative pt-2 pb-7 z-[2] ">
              <picture>
                <SourceImg
                  q={80}
                  width="500"
                  breaking="md"
                  link
                  srcSet={product?.img?.src}
                />
                <Img
                  q={80}
                  width={`300`}
                  link
                  className="object-cover w-max h-[140px] lg:h-[190px]   aspect-square pt-2 "
                  alt={`${product?.title} cómpralo ahora en Nutrillacta`}
                  src={product?.img?.src}
                />
              </picture>
            </div>
          </Link>

          <div className="bg-white  flex flex-col h-[70%] justify-between w-full  relative">
            <MensajesRandomProducto
              producto={product}
              categoriaPertenece={categoriaPertenece}
            />
            <P
              size="medium"
              className="mb-[2px] text-[1.06rem] px-2 pt-2 text-center w-full capitalize text-gray-900 leading-[1.2rem] lg:leading-[1.5rem]  font-[500] relative "
            >
              {formatTitle(product?.title)}
            </P>

            <div className=" h-full pt-2  w-full justify-end text-black/80 leading-none flex flex-col gap-2">
              <div className="flex flex-col h-full  gap-2 px-2    justify-end  ">
                <div className="  flex flex-col gap-2 w-full items-center h-full justify-center  px-2">
                  <p className="my-auto h-full flex flex-col gap-0 w-full max-w-full items-start  justify-center font-[400] text-[.8rem]">
                    <div
                      className={`flex justify-evenly  h-full  w-full items-center text-gray-600`}
                    >
                      <P
                        size="normal"
                        className="text-paleta-900/50 lg:text-[1rem] lg:text-paleta-900/60"
                      >
                        {product?.name ? product?.name : "750ml"}
                      </P>

                      <div className="flex items-center gap-[2px]">
                        <P size="normal" className="font-bold lg:text-[1rem]">
                          ${Number(product?.price).toFixed(2)}
                        </P>
                        {product?.variants?.length == 1 &&
                          product?.oldPrice != 0 &&
                          !isNaN(product.oldPrice) && (
                            <p className="text-[.72rem] lg:text-[.8rem] line-through text-black/40">
                              {Number(product.oldPrice).toFixed(2)}
                            </p>
                          )}
                      </div>
                    </div>
                  </p>
                </div>
                <div className="p-0 opacity-85 mb-2 z-[2]">
                  <BotonAgregarAlCarro
                    one={isTopOne}
                    singleProduct={product}
                    index={index}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
