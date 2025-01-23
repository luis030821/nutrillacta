import { Product, format } from "@/services/url";
import React, { useEffect, useState } from "react";
import Img from "../img/Img";
import { useData } from "@/context/withContext";
import { BotonAgregarAlCarro } from "../button/BotonAgregarAlCarro";
import Link from "next/link";

export default function TajertaProductoCombo({
  product,
}: {
  product: Product;
}) {
  const { products, categories } = useData();
  const [combosItems, setcombosItems] = useState<any[]>();
  const [arr, setArr] = useState<Product[]>();
  const [indexCombo, setindexCombo] = useState<{}>();
  useEffect(() => {
    if (product.combo) {
      // Utiliza useEffect para manejar efectos secundarios como este
      const updatedArr: Product[] = [];
      let indexCombo_: { [key: number]: number } = {};
      for (let index = 0; index < product.combo.length; index++) {
        const productoRecomendado = products.find(
          (e) => e.productId === product.combo[index].slice(0, 10)
        );
        indexCombo_[index] = Number(product.combo[index].slice(10, 11));
        if (productoRecomendado) {
          updatedArr.push(productoRecomendado);
        }
      }
      setindexCombo(indexCombo_);
      setArr(updatedArr); // Actualiza el estado de arr con el nuevo array de productos
    }
  }, [product.combo, products]);

  const categoriaPertenece = `${format(
    categories.find((e) => e.categoryId == product.categoryId)?.title
  )}`;

  return (
    <div className="w-full border border-gray-200 min-h-[170px] flex rounded-[9px] overflow-hidden">
      <Link
        href={{
          pathname: `/menu/[categoria]/[producto]`,
          query: {
            categoria: categoriaPertenece,
            producto: `${format(product.title)}`,
            fm: "true",
          },
        }}
        className="w-1/3 p-1 bg-paleta-200 flex items-center justify-center"
      >
        <Img link q={90} width="200" src={product.variants[0]?.img?.src}></Img>
      </Link>
      <div className="w-2/3 py-2 relative flex flex-col justify-between">
        <div className="w-full flex  gap-1 items-center justify-between">
          <div className="w-full bg-gray-300 h-[2px]"></div>
          <h2 className="shrink-0 text-center font-medium text-[1rem]">
            {product.title}
          </h2>
          <div className="w-full bg-gray-300 h-[2px]"></div>
        </div>
        <div>
          {/* <p className="pl-3">Incluye: </p> */}
          <ul className="w-full flex flex-col gap-1 justify-start items-start  mt-1 mb-1">
            {arr?.map((e, index) => (
              <li className=" font-medium text-[.9rem]">
                {e.title}{" "}
                <span className="text-[.8rem] font-light">
                  {/* @ts-ignore */}
                  {e.variants[indexCombo[index]]?.name}
                </span>{" "}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto justify-evenly mt-0 flex gap-2 items-center">
          <div className="text-[.9rem] font-light">
            ${Number(product.variants[0].price).toFixed(2)}
          </div>
          <div className="max-w-[380px] w-full">
            <BotonAgregarAlCarro
              fromCombo
              //@ts-ignore
              singleProduct={{ ...product, ...product.variants[0].price }}
              index={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
