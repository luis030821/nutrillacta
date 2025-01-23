import { useCart } from "@/context/CartContext";
import { useIsLogin } from "@llampukaq/realm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icons as I, Icons, ICONS } from "@llampukaq/icons";
import { getGreeting } from "@/infraestructure/cart/funciones";
import { useOrders } from "@/backend/useOrders";
import client from "@/client";

function Navbar() {
  const router = useRouter();
  const orders = useOrders();

  const [rutaDelUsuario, setrutaDelUsuario] = useState("");
  const { isLogin } = useIsLogin();
  useEffect(() => {
    setrutaDelUsuario(router.pathname);
  }, [router.pathname]);

  interface Router {
    name: string;
    path: string[];
    icon: ICONS;
  }

  const { shop } = useCart();
  const g = () => {
    return orders?.orders !== undefined
      ? [
          {
            name: "Ordenes",
            path: ["/mispedidos"],
            icon: "IconPointerDollar",
          },
        ]
      : [];
  };
  const routers: Router[] = [
    {
      name: "Inicio",
      path: ["/", "/menu"],
      icon: "IconHome",
    },
    {
      name: "Carrito",
      path: ["/cart", "/confirmarCompra", "/ordenes"],
      icon: "IconShoppingCart",
    },

    // @ts-ignore
    ...g(),
  ];
  console.log(routers);
  return (
    <>
      <nav
        style={{ zIndex: 55 }}
        className="fixed bottom-0 w-full max-w-[550px]"
      >
        <div className="bg-zinc-50 sombra-top-navbar p-3 flex justify-center items-center text-black font-semibold relative">
          <div className="w-full flex justify-center">
            <div className="w-full gap-4 flex justify-evenly">
              {routers.map((datos, index) => (
                <React.Fragment key={index}>
                  {datos?.path?.[0] == "/cart" ? (
                    <Link href={datos?.path?.[0]}>
                      <div className="flex justify-center flex-col relative">
                        {datos.path.some(
                          (e) => e.slice(1, 4) === rutaDelUsuario.slice(1, 4)
                        ) && (
                          <div
                            key={index}
                            className="absolute -left-3 top-[-12px] h-[2px] w-[150%] bg-paleta-100"
                          ></div>
                        )}
                        <div className={`flex justify-center relative`}>
                          <Icons
                            size={30}
                            className={`w-8 h-8 ${
                              datos.path.includes(rutaDelUsuario)
                                ? "stroke-paleta-100"
                                : "stroke-gray-400"
                            } `}
                            icon={datos.icon}
                          ></Icons>
                          {shop.length !== 0 && (
                            <p className="absolute thin-texto text-[.9rem] top-0 right-0 bg-paleta-100 text-paleta-300 rounded-full p-2 h-[20px] w-[20px] flex justify-center items-center">
                              {shop.length}
                            </p>
                          )}
                        </div>
                        <p
                          className={`font-[400] ${
                            datos.path.includes(rutaDelUsuario)
                              ? "text-paleta-100 font-[400]"
                              : "text-gray-400"
                          } `}
                        >
                          {datos.name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link href={datos?.path?.[0]}>
                      <div className="flex justify-center flex-col relative">
                        <div className={`flex justify-center `}>
                          {datos?.path?.some(
                            (e) => e.slice(1, 4) === rutaDelUsuario.slice(1, 4)
                          ) && (
                            <div
                              key={index}
                              className="absolute -left-3 top-[-12px] h-[2px] max-w-[90px] w-[150%] bg-paleta-100"
                            ></div>
                          )}
                          <Icons
                            size={30}
                            className={`w-8 h-8  ${
                              datos?.path?.some(
                                (e) =>
                                  e.slice(1, 4) === rutaDelUsuario.slice(1, 4)
                              )
                                ? "stroke-paleta-100"
                                : "stroke-gray-400"
                            }`}
                            icon={datos.icon}
                          ></Icons>
                        </div>
                        <p
                          className={`font-[400]   ${
                            datos?.path?.some(
                              (e) =>
                                e.slice(1, 4) === rutaDelUsuario.slice(1, 4)
                            )
                              ? "text-paleta-100"
                              : "text-gray-400 "
                          } `}
                        >
                          {datos.name}
                        </p>
                      </div>
                    </Link>
                  )}
                </React.Fragment>
              ))}
              <a
                className="flex justify-center flex-col rounded-full"
                target="_blank"
                referrerPolicy="no-referrer"
                href={`https://api.whatsapp.com/send?phone=593${Number(
                  client.celular
                )}&text=${getGreeting()},${" "} `}
              >
                <div className={`flex min-h-[32px] justify-center relative`}>
                  <I
                    className="stroke-[#25d366]"
                    size={32}
                    icon={"IconBrandWhatsapp"}
                  ></I>
                </div>
                <p className="font-[400] text-[#25d366] mx-auto">{"Chatear"}</p>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
