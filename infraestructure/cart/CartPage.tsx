import Modal, { useModal } from "@/components/modal/Modal";

import { useCart } from "@/context/CartContext";
import { useData } from "@/context/withContext";
import { Product } from "@/services/url";
import { Icons } from "@llampukaq/icons";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format } from "@/services/url";
import { order } from "@/interface";

import VistaPreviaProductos from "./VistaPreviaProductos";
import { getGreeting } from "./funciones";
import Img from "@/components/img/Img";
import useInventory from "@/context/inventory/useInventory";
import QrGenerator from "@/components/QrGenerator";
import client from "@/client";

function CartPage() {
  const [data, setData] = useState<order>();
  const { products } = useData();
  const { shop } = useCart();
  const [productos, setproductos] = useState<any[]>();
  const [all, setall] = useState(0);
  // const { inventory } = useInventory();
  useEffect(() => {
    const all = shop
      // ?.filter(
      //   (x) =>
      //     x.productId ==
      //     inventory?.find((e) => e.productId == x.productId)?.productId
      // )
      .map((e) => {
        const count = e.count;
        const index = parseFloat(e.productId.charAt(e.productId.length - 1));
        const product = products.find(
          (x) => x.productId == e.productId.substring(0, e.productId.length - 1)
        );
        return (parseFloat(product?.variants[index].price as any) *
          count) as number;
      })
      .reduce((a, b) => a + b, 0);
    setall(all);
  }, [shop]);

  useEffect(() => {
    const mappedProducts = shop.map((shopItem, ind) => {
      const product = products.find(
        (product) => product.productId === shopItem.productId.slice(0, 10)
      );
      return product
        ? `%20%0A${ind + 1}.%20 x` +
            shopItem.count +
            " " +
            product.title +
            " " +
            product.variants[Number(shopItem.productId.slice(10, 11))].name +
            ""
        : "Producto no encontrado";
    });
    setproductos(mappedProducts);
  }, [shop, products]);
  const modal = useModal();

  const [clickSobreTresPuntos, setclickSobreTresPuntos] = useState(false);
  const modalQr = useModal();
  return (
    <div className="relative min-h-[90vh] justify-between flex flex-col lg:max-w-[700px] lg:mx-auto">
      <NextSeo title="Carro de compras | Nutrillacta" description="" />
      <div>
        {shop.length < 1 ? (
          <>
            <div className="p-3">
              <div className="flex gap-2 items-center mb-3 justify-center ">
                {data?.show ? (
                  <></>
                ) : (
                  <>
                    <h1 className="text-[1.2rem] lg:text-[1.5rem] font-bold lg:text-center ">
                      Carro de compras
                    </h1>
                  </>
                )}{" "}
              </div>
              <>
                <p className=" py-4 px-6 text-[.9rem] border rounded-[9px] shadow-sm text-gray-600 border-[#e0e0e0]">
                  Al parecer, no tienes productos añadidos al carrito.
                  <Link href={"/menu"}>
                    <span className="block">
                      Mira nuestro <span className="underline">catálogo</span>
                      de bebidas. <span className="underline">Aquí</span>
                    </span>
                  </Link>
                </p>
                <VistaPreviaProductos />
              </>
            </div>
          </>
        ) : (
          <>
            <div className="p-3">
              <div className="flex  gap-2  items-center justify-between lg:justify-center">
                <div className="flex items-center lg:justify-center">
                  <p className="text-[1.2rem] lg:text-[1.5rem] font-bold lg:text-center  ">
                    Carro de compras
                  </p>
                </div>
                <div
                  onClick={() => setclickSobreTresPuntos(!clickSobreTresPuntos)}
                  className="border rounded-full w-10 h-10 flex items-center justify-center relative"
                >
                  {clickSobreTresPuntos && (
                    <div className="my-1 shadow-md text-paleta-900 rounded-[12px] border bg-paleta-300 text-[.9rem] flex flex-col gap-3 p-2 px-4 absolute right-[90%] top-[90%]  w-max ">
                      <div>
                        <a
                          className="flex justify-center flex-col rounded-full"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          href={`https://api.whatsapp.com/send?phone=593${Number(
                            client.celular
                          )}&text=${getGreeting()}. Quisiera seguir con mi pedido: ${productos}`}
                        >
                          Seguir orden por Whatsapp
                        </a>
                      </div>
                      <div onClick={modalQr.open}>
                        Qr local
                        <Modal title="Qr" modal={modalQr}>
                          <div className="max-w-[400px] mx-auto">
                            <QrGenerator value={JSON.stringify(shop)} />
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}
                  <Icons className="stroke-paleta-900" icon="IconDots" />
                </div>
              </div>
            </div>

            <div className="px-3 flex flex-col  gap-2">
              {shop
                // ?.filter(
                //   (x) =>
                //     x.productId ==
                //     inventory?.find((e) => e.productId == x.productId)
                //       ?.productId
                // )
                ?.map((x, index) => (
                  <CartPrintProduct
                    key={index}
                    count={x.count}
                    index={parseFloat(
                      x.productId.charAt(x.productId.length - 1)
                    )}
                    product={products.find(
                      (e) =>
                        e.productId ==
                        x.productId.substring(0, x.productId.length - 1)
                    )}
                  />
                ))}
              {/* { ?.filter(
                 (x) =>
                   x.productId !=
                   inventory?.find((e) => e.productId == x.productId)?.productId)
              shop.length != 0 && (
                <div className="flex items-center lg:justify-center">
                  <p className="text-[1.2rem] lg:text-[1.5rem] font-bold lg:text-center  ">
                    No disponible
                  </p>
                </div>
              )} */}

              {/* {shop
                ?.filter(
                  (x) =>
                    x.productId !=
                    inventory?.find((e) => e.productId == x.productId)
                      ?.productId
                )
                ?.map((x, index) => (
                  <div key={index} className="w-full h-full relative">
                    <div className="absolute top-0 right-0 bg-white/20 w-full h-full z-10 " />
                    <CartPrintProduct
                      key={index}
                      count={x.count}
                      index={parseFloat(
                        x.productId.charAt(x.productId.length - 1)
                      )}
                      product={products.find(
                        (e) =>
                          e.productId ==
                          x.productId.substring(0, x.productId.length - 1)
                      )}
                    />
                  </div>
                ))} */}
              <Link href={"menu"}>
                <div className="flexs rounded-3xl p-3 items-center mb-5">
                  <p className="text-[.8rem] font-[400]">
                    ¿Olvidaste agregar algo más?{" "}
                    <span className="underline">Ver catálogo</span>
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>

      <div
        id="FOOTER-CART"
        className="z-[10] px-2 pb-5 bottom-[80px] max-w-[550px] lg:max-w-[1200px] lg:w-full lg:bottom-0  lg:left-0  sticky  w-full bg-paleta-300 rounded-[10px] border-t-[1px] border-[#e0e0e0]"
      >
        <div className="flex gap-3 my-3">
          <h1 className="">Total a pagar:</h1>
          <p className="">${all?.toFixed(2)}</p>
        </div>
        <Link href="/confirmarCompra">
          <button
            disabled={all == 0 ? true : false}
            onClick={modal.open}
            className="bg-paleta-100 p-2 rounded-[10px] text-paleta-300 w-full font-medium"
          >
            Confirmar compra
          </button>
        </Link>
      </div>
    </div>
  );
}
export default CartPage;
const CartPrintProduct = ({
  product,
  count,
  index,
}: {
  product: Product | undefined;
  count: number;
  index: number;
}) => {
  const { categories } = useData();
  const { addCart, removeCart } = useCart();
  const [showDesciption, setshowDesciption] = useState(false);
  const variant = product?.variants[index];

  return (
    <>
      <div className="flex shadow-md  border border-[#e0e0e0] rounded-[10px] p-3 items-center">
        <Link
          className="w-3/12 relative"
          href={`menu/${format(
            categories.find((e) => e.categoryId == product?.categoryId)?.title
          )}/${format(`${product?.title} ${product?.variants[index].name}`)}`}
        >
          <Img
            width="200"
            link
            className="rounded-[12px] "
            src={variant?.img?.src}
            alt=""
          />
        </Link>

        <div className="flex flex-col w-9/12 justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex justify-evenly gap-2 items-center">
                <h2 className="w-full text-left capitalize font-medium text-[1.1rem]">
                  {product?.title}
                </h2>
                <div className="bg-paleta-100 flex gap-1 px-2 py-1 rounded-[6px] text-[.8rem] ">
                  <div className="flex items-center justify-center">
                    <Icons
                      stroke={1.4}
                      className="stroke-white"
                      icon="IconBottle"
                      size={18}
                    />
                  </div>
                  <p className="bg-white rounded-[6px] px-2">{variant?.name}</p>
                </div>
              </div>

              <div
                onClick={() => {
                  //@ts-ignore
                  removeCart(`${product?.productId}${index}`, count);
                }}
                className="flex items-center justify-center bg-paleta-300 rounded-full p-1 z-10"
              >
                <Icons
                  className="stroke-[#b8b8b8] hover:stroke-black/60"
                  size={22}
                  icon="IconTrash"
                ></Icons>
              </div>
            </div>

            <div
              onClick={() => setshowDesciption(!showDesciption)}
              className="text-[.8rem] lg:text-[1rem] my-2 text-black/80"
            >
              {showDesciption ? (
                <>{product?.description}</>
              ) : (
                <>{product?.description?.split("")?.slice(0, 105)}...</>
              )}
            </div>
          </div>

          <div className="border-t-[1px] pt-2">
            <div className=" flex gap-2 items-start w-full justify-between px-2">
              <div className="">
                <p className="text-[.7rem] lg:text-[.9rem]">Precio unitario</p>
                <p className="-mt-[5px] font-medium text-[1rem]">
                  {Number(variant?.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[.9rem]">
                <div className="flex flex-col gap-2  items-center justify-center">
                  <p className="text-[.7rem] lg:text-[.9rem]">Cantidad:</p>
                  <div className="-mt-[5px] text-paleta-800 flex items-center gap-2 bg-paleta-200 rounded-[6px]">
                    <button
                      onClick={() => {
                        removeCart(`${product?.productId}${index}`);
                      }}
                      className=" pl-2 flex justify-center items-center"
                    >
                      <p className="p-1  mt-[-2px] ">-</p>
                    </button>
                    <p className="text-center min-w-[18px] border-l border-r px-4">
                      {count}
                    </p>
                    <button
                      onClick={() => {
                        addCart(`${product?.productId}${index}`, 1);
                      }}
                      className="pr-2 py-1   flex justify-center items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[.7rem] lg:text-[.9rem]">Total:</p>
                <p className="font-medium -mt-[6px]">
                  {variant?.price
                    ? //@ts-ignore
                      (variant?.price * count).toFixed(2)
                    : "Precio no disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
