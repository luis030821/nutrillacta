import Button from "@/components/button/Button";
import P from "@/components/html/P";
import Modal from "@/components/modal/Modal";
import { PropLugarEstimado } from "@/components/modal/ModalPrecioEnvioEstimado";
import { useModal } from "@/components/modal/OldModal";
import { useAddressInfo } from "@/context/address/AddressContext";
import { useCart } from "@/context/CartContext";
import useMessage from "@/context/message/useMessage";
import useMainContext from "@/context/useMainContext";
import { ModalAddDirection } from "@/infraestructure/me/MePages/Dirrection";
import { Product, Variant } from "@/services/url";
import { Icons as I, Icons } from "@llampukaq/icons";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { MemoizedIcon } from "../MemoizedIcons";
import { BotonAgregarAlCarro } from "@/components/button/BotonAgregarAlCarro";

export default function CuadradoDePrecioPc({
  containerRef,
  mobile,
  variant,
  price,
  singleProduct,
  showInformacionInfo,
}: {
  containerRef?: any;
  mobile?: boolean;
  variant?: Variant & { index: number };
  price: string;
  conteoDeProducto: number;
  singleProduct: Product;
  showInformacionInfo?: boolean;
}) {
  const { selectedLocalidad, convertirMetrosAKilometrosConTiempo, modalMap } =
    useAddressInfo();
  const { onPc } = useMainContext();
  const { message } = useMessage();
  const { addCart, shop } = useCart();
  const router = useRouter();
  const [conteoDeProducto, setConteoDeProducto] = useState(1);
  const [horaDeEntrega, setHoraDeEntrega] = useState("");
  const [isContainerVisible, setIsContainerVisible] = useState(true);

  useEffect(() => {
    const updateDeliveryTime = () =>
      setHoraDeEntrega(addRandomMinutesToCurrentTime.toString());
    updateDeliveryTime();

    const intervalId = setInterval(updateDeliveryTime, 120000);
    return () => clearInterval(intervalId);
  }, []);
  const [date, setdate] = useState("");

  const handleScroll = () => {
    if (containerRef && containerRef.current) {
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      const isVisible = top >= 75 && bottom <= window.innerHeight;

      setIsContainerVisible(isVisible);
    }
  };

  useEffect(() => {
    if (!onPc) return;
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    setdate(
      addRandomMinutesToCurrentTime(
        convertirMetrosAKilometrosConTiempo(
          selectedLocalidad?.route?.distance
            ? selectedLocalidad?.route?.distance
            : 0
        ).minutos
      )
    );
  }, [selectedLocalidad]);

  const sumarUno = () => {
    setConteoDeProducto((prevConteo) => prevConteo + 1);
  };

  const restarUno = () => {
    if (conteoDeProducto > 1) {
      setConteoDeProducto((prevConteo) => prevConteo - 1);
    }
  };
  const addRandomMinutesToCurrentTime = useCallback((minutes?: number) => {
    {
      const currentTime = new Date();
      const randomMinutes =
        minutes !== undefined && minutes !== 0
          ? minutes
          : Math.floor(Math.random() * (32 - 27 + 1)) + 27; // Genera un número aleatorio entre 27 y 32 si no se proporciona un valor

      const newTime = new Date(currentTime.getTime() + randomMinutes * 60000); // Añade los minutos al tiempo actual en milisegundos

      // Formatea la nueva hora en formato de 12 horas con AM/PM
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = newTime.toLocaleTimeString("en-US", options);

      return formattedTime;
    }
  }, []);
  const agregarAlcarroLogica = (prop?: string) => {
    try {
      addCart(`${singleProduct?.productId}${variant?.index}`, conteoDeProducto);
      if (conteoDeProducto < 2) {
        message({
          type: "success",
          description: `Producto agregado: ${singleProduct.title} ${variant?.name}`,
        });
        if (prop == "goCart") {
          router.push("/confirmarCompra");
        }
      } else {
        message({
          type: "success",
          description: `Se agregaron: x${conteoDeProducto} ${singleProduct.title} ${variant?.name}`,
        });
        if (prop == "goCart") {
          router.push("/confirmarCompra");
        }
      }
    } catch (error) {
      message({
        type: "error",
        description: `No se pudo agregar el producto`,
      });
    }
  };
  const modalDirrection = useModal();
  // para mobile

  const ComponentEnvio = () => {
    return (
      <div
        className={`flex flex-col ${
          !onPc && "border rounded-[5px] mt-1 relative overflow-hidden"
        }`}
      >
        {!onPc && (
          <>
            <div className="absolute h-full w-[4px] bg-blaze-orange-400 left-0" />
            <span className="shrink-0 pl-4 mb-2 pt-2 text-[.9rem]">
              Información de envío
            </span>
            <div className="absolute h-full w-[4px] bg-blaze-orange-400 right-0" />
          </>
        )}

        <div
          className={`${
            onPc
              ? "flex justify-between border-b-[1px] border-black/10  pb-3 w-full pt-4"
              : "flex  gap-2 items-center pl-4"
          }`}
        >
          {onPc && <P size="normal">Enviar a: </P>}

          <P
            size="normal"
            className="flex gap-0 items-center text-[.9rem] lg:text-[1rem]"
          >
            <I size={onPc ? 24 : 19} stroke={1.5} icon="IconMapPin"></I>{" "}
            {!onPc && <span className="pl-1 mr-1">Enviar a:</span>}
            <span
              onClick={() => modalMap.open()}
              className="underline hover:text-blaze-orange-700 cursor-pointer"
            >
              {" "}
              {selectedLocalidad?.formated1.substring(0, onPc ? 17 : 26)}{" "}
            </span>
          </P>
        </div>
        <div
          className={`  text-black flex flex-col gap-1  border-b-[1px] border-black/10 pb-2 ${
            !onPc ? "pl-4" : "pt-2"
          }`}
        >
          <P
            size="normal"
            className="flex items-center font-normal lg:font-semibold gap-1 text-[.9rem] lg:text-[1rem]"
          >
            <MemoizedIcon
              size={onPc ? 24 : 19}
              stroke={1.5}
              icon="IconMotorbike"
            />
            {/* <I size={onPc ? 24 : 19} stroke={1.5} icon="IconMotorbike"></I>{" "} */}
            Costo de envío: $
            {selectedLocalidad.default
              ? selectedLocalidad.price.substring(1, 20)
              : selectedLocalidad.price}{" "}
            {!selectedLocalidad.default && (
              <span className="font-light lg:font-thin text-blaze-orange-600">
                Aplica envío rápido
              </span>
            )}
          </P>
          <P
            size="normal"
            className="flex items-center gap-1 text-[.9rem] lg:text-[1rem] "
          >
            <MemoizedIcon
              size={onPc ? 24 : 19}
              stroke={1.5}
              icon="IconClockHour4"
            />
            <span className="font-light lg:font-thin">Entrega: </span>
            <span className="font-semibold">Hoy día </span> {date}
          </P>
        </div>
      </div>
    );
  };

  if (mobile && showInformacionInfo && !onPc) return <ComponentEnvio />;
  if (mobile && !onPc)
    return (
      <div className="sticky z-[20] bottom-[78px] w-full max-w-[550px] mx-auto  px-4 pb-3 bg-white border-t-[2px]">
        <div className="flex flex-row-reverse py-2 items-center justify-between  w-full">
          <div className="flex items-center space-x-5 justify-center">
            <div className="flex flex-col">
              <p className="text-[.9rem]">Cantidad:</p>
              <BotonAgregarAlCarro
                //@ts-ignore
                index={variant?.index}
                //@ts-ignore
                singleProduct={{ ...singleProduct, ...variant }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[.9rem]">Total:</p>
            <h2 className=" text-3xl font-bold ">
              {(
                Number(variant?.price ?? 0) *
                (shop.find(
                  (x) =>
                    x.productId == `${singleProduct.productId}${variant?.index}`
                )?.count ?? 0)
              ).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    );
  // para pc
  else if (onPc && !mobile)
    return (
      <>
        <Modal oldModal modal={modalDirrection} title="Agregar una dirección">
          <ModalAddDirection modal={modalDirrection} />
        </Modal>
        <div className="relative w-full max-w-[400px] select-text">
          <div className="sticky z-[2] mt-12 pb-5  border border-black/10 rounded-[7px] top-[145px]  w-full  mx-auto  px-4 bg-white ">
            {!isContainerVisible && (
              <>
                <p className="pt-3 pb-2 capitalize border-b-[1px] border-black/10  text-left text-gray-800 lg:text-[1.1rem] font-semibold  leading-[2rem]">
                  {singleProduct.title} | {variant?.name}
                </p>
              </>
            )}
            <ComponentEnvio />
            <div className="flex flex-row py-2 items-center justify-between  w-full select-none">
              <div className="flex items-center space-x-5 justify-center">
                <div className="flex flex-col">
                  <p className="text-[.9rem]">Cantidad:</p>
                  <div className="text-[1.4rem] flex items-center gap-2 border-2 w-max rounded-[12px] border-paleta-100">
                    <div
                      onClick={restarUno}
                      className="w-[35px] h-[35px]  p-3 bg-paleta-100  rounded-[9px] flex justify-center items-center"
                    >
                      <MemoizedIcon className="stroke-white" icon="IconMinus" />
                      {/* <I className="stroke-white" icon="IconMinus"></I> */}
                    </div>
                    <h2 className="text-center min-w-[50px]">
                      {conteoDeProducto}
                    </h2>
                    <div
                      onClick={sumarUno}
                      className="w-[35px] h-[35px]  p-3 bg-paleta-100   text-paleta-300 rounded-[9px] flex justify-center items-center"
                    >
                      <I className="stroke-white" icon="IconPlus"></I>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[.9rem]">Total:</p>
                <h2 className=" text-3xl font-bold ">
                  {(Number(price) * conteoDeProducto).toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="flex flex-col lg:flex-col-reverse gap-2 w-full justify-center items-center text-white/60 lg:text-white">
              <Button
                secondary
                onClick={() => agregarAlcarroLogica()}
                className="rounded-[6px]  min-w-full "
              >
                <P className="text-[1.1rem]">Agregar al carrito</P>
              </Button>

              <Button
                onClick={() => agregarAlcarroLogica("goCart")}
                className="rounded-[6px]   min-w-full bg-paleta-100   "
              >
                <P className="text-[1.1rem]"> Comprar ahora</P>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  else {
    return;
  }
}
