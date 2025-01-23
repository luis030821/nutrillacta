import Modal, { useModal } from "@/components/modal/Modal";
import useMessage from "@/context/message/useMessage";
import { Icons } from "@llampukaq/icons";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Resumen from "../home/Resumen";
import Link from "next/link";
import { useConfirmarCompra } from "./context/ConfirmarCompraProvider";
import SeguirPorWhastapp from "@/components/confirmar_compra/SeguirPorWhastapp";
import { useCart } from "@/context/CartContext";
import useMainContext from "@/context/useMainContext";
import { useIsLogin } from "@llampukaq/realm";
import AnonymousShop from "./components/AnonymousShop/AnonymousShop";
function ConfirmarCompraPages() {
  const { onPc } = useMainContext();
  const { loading } = useConfirmarCompra();
  const router = useRouter();
  const modalDirrection = useModal();
  const modalhelpDirrection = useModal();
  const modalhelpTransferencia = useModal();
  const modalFueraDeAlcance = useModal();
  const modalhelpResumen = useModal();
  const modalOpcionVerPedido = useModal();
  const { message } = useMessage();
  const { shop } = useCart();
  const { onSuccessOrderCreate, setLoading } = useConfirmarCompra();
  const { price, methodPayment, addressId } = useConfirmarCompra();

  const onClick = async () => {
    if (addressId == undefined) {
      message({
        type: "alert",
        description: "Selecciona una dirección",
      });
    }
    if (addressId != undefined) {
      setLoading(true);
      if (methodPayment == "tranfer") {
        await onSuccessOrderCreate({ name });
        setLoading(false);
      }
      if (methodPayment == "cash") {
        await onSuccessOrderCreate({ name });
      }
      if (methodPayment == "card") {
        const res = document.querySelector("#paypalFormCredit");
        //@ts-ignore
        res?.click();
      }
    }
  };
  useEffect(() => {
    if (shop.length < 1) {
      router.push("/");
    }
  }, []);
  const { isLogin } = useIsLogin();
  const createOrder = () => {
    loading
      ? message({
          type: "alert",
          description: "Se está generando la orden de pago",
        })
      : onClick();
  };
  return (
    <>
      <NextSeo title="Confirmar compra | Nutrillacta " description="" />
      {isLogin ? (
        <>
          <div
            className={` flex flex-col gap-4 relative lg:max-w-[1200px] lg:mx-auto`}
          >
            <Modal
              oldModal
              modal={modalOpcionVerPedido}
              title="¿Qué sucede después de finalizar el pedido?"
            >
              <div className="flex flex-col gap-3 text-[.9rem] ">
                <p>
                  Al finalizar este pedido, serás dirigido a un segmento donde
                  podrás ver el estado de tu pedido y la opción de rastrear al
                  repartidor. En cualquier momento, tendrás habilitada la opción
                  de hacerlo haciendo clic en el ícono de 'Ver orden' (se
                  desbloqueará una vez que completes este pedido).
                </p>
              </div>
            </Modal>

            <div className="py-3 p-1 relative">
              <div className=" flex items-center justify-center mb-5 mt-[-8px]  ">
                <h1 className=" font-bold text-[1.3rem] lg:text-[1.8rem] ">
                  Confirmar compra
                </h1>
                <div onClick={router.back} className="left-4 absolute">
                  <Icons size={32} icon="IconChevronLeft"></Icons>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="p-2 lg:w-1/2 lg:flex lg:flex-col">
                  {onPc && (
                    <h2 className="text-center font-bold text-[1.1rem] lg:text-[1.3rem]">
                      Resumen de tu compra:
                    </h2>
                  )}
                  <div className="flex flex-col gap-2 p-2 lg:p-0 bg-paleta-200 lg:bg-transparent ">
                    <div className="flex gap-2 items-center w-full justify-between">
                      {!onPc && (
                        <p className="text-paleta-900/80 text-sm font-medium lg:text-[1rem]">
                          Estás a punto de comprar:{" "}
                        </p>
                      )}
                      <Link
                        href={"/cart"}
                        className="underline text-blue-500  text-sm lg:text-[1rem] "
                      >
                        Editar carrito
                      </Link>
                    </div>
                    <div className="">
                      <Resumen />
                    </div>
                  </div>
                  <SeguirPorWhastapp />
                </div>
                {onPc ? (
                  <>
                    <div className="w-[1px] bg-transparent border-r-[1px] border-black/10 mr-3"></div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <AnonymousShop />
      )}
    </>
  );
}
export default ConfirmarCompraPages;
