import { useData } from "@/context/withContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category, Product, format } from "@/services/url";
import Img from "@/components/img/Img";
import { Icons } from "@llampukaq/icons";

export default function VistaPreviaProductos() {
  const [arr, setArr] = useState<Product[] | undefined>();
  const { categories, products } = useData();

  useEffect(() => {
    logic();
  }, []);
  const logic = async () => {
    var arr: Product[] = [];

    var categoriaMaxima = 7;
    var productoMaxima = 1;

    let verificarSiNumeroRandomSeRepiteCategorias: number[] = [];
    for (let i = 0; i < categoriaMaxima; i++) {
      var numRand = Math.floor(Math.random() * categories.length);
      if (verificarSiNumeroRandomSeRepiteCategorias.includes(numRand)) {
        numRand = Math.floor(Math.random() * categories.length);
      }
      var cat = categories[numRand].categoryId;
      var arrProduct: Product[] = [];
      products.map((e, inx) => {
        if (cat === e.categoryId) {
          arrProduct.push(e);
        }
      });
      let verificarSiNumeroRandomSeRepiteProductos: number[] = [];
      for (let i = 0; i < productoMaxima; i++) {
        var numRandProuct = Math.floor(Math.random() * arrProduct.length);
        if (verificarSiNumeroRandomSeRepiteProductos.includes(numRandProuct)) {
          numRandProuct = Math.floor(Math.random() * arrProduct.length);
        }
        verificarSiNumeroRandomSeRepiteProductos.push(numRandProuct);
        var final = arrProduct[numRandProuct];
        arr.push(final);
      }
      verificarSiNumeroRandomSeRepiteCategorias.push(numRand);
    }
    //@ts-ignore

    setArr(arr);
  };
  return (
    <div>
      <div className="flex w-[100%]  gap-2 mx-auto overflow-auto">
        {arr?.map((e, index) => (
          <Link
            key={index + "arr - vpp"}
            href={{
              pathname: "/menu/[categoria]/[producto]",
              query: {
                categoria: `${format(
                  categories.find((x) => e.categoryId == x.categoryId)?.title
                )}`,
                producto: `${format(e.title)}`,
              },
            }}
          >
            <div className="my-2 max-w-[170px] py-1 relative">
              <Img
                width="150"
                link
                className="rounded-full border min-h-[80px] min-w-[80px] max-w-[80px] shadow-sm"
                src={e.variants[0].img.src}
                alt={`imagen ${e.title} ${e.variants[0].name}`}
              />
            </div>
          </Link>
        ))}
      </div>
      <Link className="w-max" href={"/menu"}>
        <div className="mt-3 ">
          <button className="px-5 py-2 rounded-lg flex gap-4 items-center border bg-paleta-100">
            <Icons
              className="stroke-paleta-300  pl-[6px]"
              size={28}
              icon="IconShoppingCartPlus"
            ></Icons>
            <span className="text-paleta-300 font-medium text-[1.1rem]">
              {" "}
              Comenzar a comprar
            </span>
          </button>
        </div>
      </Link>
    </div>
  );
}
