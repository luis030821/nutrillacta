import { useCart } from "@/context/CartContext";

import Icons from "@/styles/Icons";
import { Icons as I } from "@/icons";
import Link from "next/link";
import React from "react";
import Img from "../img/Img";
import { useData } from "@/context/withContext";
import useMainContext from "@/context/useMainContext";
import BotonBuscar from "../button/BotonBuscar";
import { useIsLogin } from "@llampukaq/realm";

export default function NavBarTop() {
  const { categories, products } = useData();
  const { isLogin } = useIsLogin();
  const { onPc } = useMainContext();
  const { shop } = useCart();

  return (
    <>
      <div
        style={{ zIndex: 99 }}
        className="fixed top-0  pr-1 lg:flex lg:items-center lg:flex-col lg:justify-center max-w-[550px] lg:max-w-full lg:left-0 w-full"
      >
        {/* {categories} */}
        <div className="w-full bg-white ">
          <div className="text-[1.2rem] items-center max-w-[1200px] mx-auto  h-[62px] p-[2px] flex justify-between">
            <div className="flex gap-2 items-center justify-center lg:w-full">
              <Link className="shrink-0" href={"/"}>
                <div className="flex items-center justify-center gap-2 p-10">
                  <Img
                    width="500"
                    src="https://nutrillacta.com/assets/favicon/android-icon-192x192.png"
                    className="rounded-full shrink-0 logo max-w-[150] min-h-[62px] max-h-[62px] lg:min-h-[65px]"
                    alt="logo"
                  />
                </div>
              </Link>
              {onPc && (
                <BotonBuscar
                  categories={categories}
                  products={products}
                  fromNav={false}
                />
              )}{" "}
            </div>
            {[...Array(0)].length != 0 ? (
              <>
                {" "}
                <Link href={"/ordenes"}>
                  <p className="text-[1rem] text-paleta-100 flex items-center gap-1 pr-1 shrink-0">
                    <I
                      className="stroke-paleta-100"
                      size={12}
                      icon="IconEye"
                    ></I>
                    Ver estado del pedido
                  </p>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                {onPc && (
                  <>
                    <Link href={"/signin"} className="flex gap-2">
                      <I
                        size={30}
                        className="stroke-paleta-800"
                        icon="IconUser"
                      />
                      <div className="text-sm flex flex-col gap-2 leading-[12px]">
                        <span className="font-semibold">Bienvenido</span>
                        {isLogin ? (
                          <span>Ver cuenta / configuración</span>
                        ) : (
                          <span>Iniciar sesión / registrarse</span>
                        )}
                      </div>
                    </Link>
                  </>
                )}
                {/* <BotonBuscarNavBar /> */}
                <Link href={"/menu"}>
                  <div className="relative shrink-0 bg-paleta-200 lg:bg-transparent p-2 rounded-full flex flex-col lg:flex-row items-start justify-start">
                    <I size={30} icon="IconBottle"></I>
                    {onPc && (
                      <div className="text-sm flex flex-col gap-2 leading-[12px]">
                        <span className="font-semibold">Catálogo</span>
                        <span>De bebidas</span>
                      </div>
                    )}
                  </div>
                </Link>
                <Link href={"/cart"}>
                  <div className="bg-paleta-200 lg:bg-transparent rounded-full p-1 ">
                    {shop.length != 0 ? (
                      <div className="lg:flex ">
                        <div className="p-1 relative">
                          <Icons className="w-8 h-8  " icon="cart"></Icons>
                          <p className="absolute thin-texto text-[.8rem] top-0 right-0 bg-paleta-900 text-paleta-300 rounded-full p-2 h-[18px] w-[18px] flex justify-center items-center">
                            {shop.length}
                          </p>
                        </div>
                        {onPc && (
                          <div className="text-sm flex flex-col gap-2 leading-[12px]">
                            <span className="font-semibold">Carrito</span>
                            <span>De compras</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="lg:flex">
                        <div className="p-1">
                          <Icons className="w-8 h-8 " icon="cart"></Icons>
                        </div>
                        {onPc && (
                          <div className="text-sm flex flex-col gap-2 leading-[12px]">
                            <span className="font-semibold">Carrito</span>
                            <span>De compras</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
