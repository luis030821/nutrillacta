import React from "react";
import { BotonAgregarAlCarro } from "../button/BotonAgregarAlCarro";
import Link from "next/link";
import { Category, Product, Variant, format } from "@/services/url";
import { useData } from "@/context/withContext";
import Img from "../img/Img";
import { Icons as I, IconsProvider } from "@/icons";
import Icons from "@/styles/Icons";
export default function TarjetaProductoHorizontal({
  product,
  index,
  fromSearch,
}: {
  product: Product & Variant;
  index?: number;
  fromSearch?: boolean;
}) {
  const { categories, products } = useData();
  const categoria = categories.find(
    (e) => e.categoryId == product.categoryId
  )?.title;
  return (
    <Link
      href={{
        pathname: "/menu/[categoria]/[producto]",
        query: {
          categoria: `${format(categoria)}`,
          producto: `${format(`${product.title} ${product.name}`)}`,
        },
      }}
      key={index}
      id={`${format(product?.title)}`}
      className={`h-max w-full p-2 flex justify-between  hover:bg-black/10 border ${
        fromSearch ? "" : "rounded-[9px]"
      } border-paleta-800/20 relative`}
    >
      <div className="relative flex flex-col justify-center items-center w-1/3 ">
        <Img
          className="object-contain max-h-[140px] h-[110px] rounded-3xl w-full "
          src={product?.img?.src}
          alt=""
        />
      </div>

      <div className="w-[80%] flex flex-col justify-between  my-2 ">
        <h1 className="pt-2 text-left text-[1.1rem] lg:text-[1.205rem] flex gap-2 items-center w-full capitalize  leading-[1.2rem] mb-1">
          {product?.title}
          {product.top === 1 ||
            (product.isPopular === "true" && (
              <span className="bg-opacity-85 text-[.7rem] flex gap-1 px-2 items-center  rounded-[6px] bg-red-500 w-max py-[1px]">
                <div className="  ">
                  <I
                    className="  stroke-white "
                    size={15}
                    icon="IconBrandTinder"
                  ></I>
                </div>
                <p className="text-white">Popular</p>
              </span>
            ))}
        </h1>
        {categoria && (
          <div className="flex items-center gap-2">
            <p className="text-black/70 text-sm lg:text-[1.05rem] capitalize">
              {categoria}
            </p>
            <p className="px-2 py-0 text-[.8rem] lg:text-[1rem] text-gray-600 rounded-[7px] border border-gray-300">
              {product.name}
            </p>
          </div>
        )}
        {/* {product.variants.length <= 1 && (
          <p className="">${Number(product.price).toFixed(2)}</p>
        )} */}

        <div className="flex flex-col justify-between   h-full">
          <div className="flex flex-col gap-1 items-start  justify-start h-full w-full mt-1 ">
            <div className="flex flex-col mb-1 h-full justify-start max-w-[220px]">
              {/* {product.variants.map((e, index) => ( */}
              <div key={index} className="flex justify-between gap-2 ">
                <p className="font-medium lg:text-[1.3rem]">
                  ${Number(product.price).toFixed(2)}
                </p>
                <div className="border-t-[2px] my-auto border-dashed border-black/20  w-full  mt-[12px]"></div>
                {/* <p className="font-medium  text-black/60 lg:text-[1.1rem]">{product.name}</p> */}
              </div>
              {/* ))} */}
            </div>
            <div className=" absolute  right-2 bottom-2">
              <button
                // onClick={() => agregarAlCarro()}
                className=" bg-paleta-800   rounded-[9px] w-max px-2 flex items-center justify-center py-2  gap-1 relative"
              >
                <div
                  className={` flex  items-center justify-center anim-text-opacity gap-1 `}
                >
                  <p className="thin-texto text-[.9rem] font-[400] text-white">
                    Comprar
                  </p>
                  <div className="min-h-[22px]">
                    <I
                      size={19}
                      className="stroke-white"
                      icon="IconShoppingCartPlus"
                    ></I>
                  </div>
                </div>
              </button>
            </div>
            {/* <div className=" flex max-w-[200px] border gap-2 items-start w-full justify-between px-2">
              <div className="">
                <p className="text-[.7rem] mb-1">Presentacion</p>
                <div className="-mt-[5px] font-medium text-[1rem] flex flex-col">
                  {product.variants.map((e, index) => (
                    <p>{e.name}</p>
                  ))}
                </div>
              </div>
              <div></div>
              <div className="flex items-center gap-3 text-[.9rem]">
                <div className="flex flex-col gap-2  items-center justify-center">
                  <p className="text-[.7rem] shrink-0">Precio unitario</p>
                  <div className="-mt-[5px] text-paleta-800 flex flex-col items-center gap-2 bg-paleta-200 rounded-[6px]">
                    {product.variants.map((e, index) => (
                      <p>{Number(e.price).toFixed(2)}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="w-max mt-3 ml-2 text-[.8rem] text-paleta-100 border-paleta-100 flex gap-2 items-center px-3 py-1 border  rounded-[6px]">
              <button className="shrink-0 ">Comprar</button>{" "}
              <I
                stroke={1.1}
                size={22}
                className="stroke-paleta-100"
                icon="IconShoppingCartPlus"
              ></I>
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
