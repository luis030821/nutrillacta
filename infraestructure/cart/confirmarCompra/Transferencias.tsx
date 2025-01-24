import Img from "@/components/img/Img";
import useMensajeSimple from "@/components/mensajes/UseMensajeSimple";
import Modal, { modal, useModal } from "@/components/modal/Modal";
import useMessage from "@/context/message/useMessage";
import { Icons } from "@/icons";
import React, { useState } from "react";

interface BankData {
  name: string;
  imgSrc: string;
  bgColor: string;
  numeroCuenta: string;
  titularCuenta: string;
  textoColor: string;
}

export default function Transferencias({ modal }: { modal: modal }) {
  const [info, setinfo] = useState<BankData | undefined>();
  const mostrarMensaje = useMensajeSimple();

  const banksData: BankData[] = [
    {
      name: "Banco de Pichincha",
      imgSrc: "/bancos/Banco-Pichincha.png",
      bgColor: "#ffc500",
      numeroCuenta: "2211134977",
      titularCuenta: "Ortega Garrido Luis Alberto",
      textoColor: "paleta-900",
    },
    {
      name: "Banco de Guayaquil",
      imgSrc: "/bancos/Banco-Guayaquil.png",
      bgColor: "#b8296d",
      numeroCuenta: "0033575127",
      titularCuenta: "Ortega Garrido Luis Alberto",
      textoColor: "paleta-300",
    },
    {
      name: "Banco del Pacífico",
      imgSrc: "/bancos/Banco-Pacifico.png",
      bgColor: "#385eb1",
      numeroCuenta: "1063045869",
      titularCuenta: "Quimbuilco Velez Luis Mateo",
      textoColor: "paleta-300",
    },
    {
      name: "Produbanco",
      imgSrc: "/bancos/Produbanco.jpg",
      bgColor: "#8bb956",
      numeroCuenta: "12661095636",
      titularCuenta: "Quimbuilco Velez Luis Mateo",
      textoColor: "paleta-300",
    },
  ];
  const { messagePromise } = useMessage();
  const handleCopy = async (numeroCuenta: string) => {
    try {
      await navigator.clipboard.writeText(numeroCuenta);
      mostrarMensaje("Copiado al portapapeles", 3500);
    } catch (error) {
      mostrarMensaje("No se puedo copiar el número de cuenta", 3500);
    }
  };

  return (
    <div className="min-w-full mt-1">
      <p className="text-[.9rem]  w-full text-gray-600 mb-2 text-left">
        Toca el banco para ver la información de la cuenta respectivamente.
      </p>

      <div className="flex gap-2 justify-evenly mb-4 mt-1">
        {banksData.map((e) => (
          <div onClick={() => setinfo(e)} className="relative">
            <Img
              className="max-w-[50px] min-h-[50px] h-auto rounded-full  "
              src={e.imgSrc}
            ></Img>
          </div>
        ))}
      </div>

      {info != undefined && (
        <>
          <div
            className={`bg-[${info.bgColor}] w-12/12 mx-auto rounded-xl p-5 flex items-center space-x-5 text-white mb-2`}
          >
            <div className="max-w-[40px]">
              <Img src={info.imgSrc}></Img>
            </div>
            <div className={` text-${info.textoColor}`}>
              <p>{info.name}</p>
              <p>Ahorros</p>
              <div
                onClick={() => handleCopy(info.numeroCuenta)}
                className={`rounded-[6px] bg-paleta-300/20 flex items-center gap-3 w-max px-3 relative  `}
              >
                <p className="text-[1.2rem] ">{info.numeroCuenta}</p>{" "}
                <Icons
                  size={16}
                  className={`opacity-75 stroke-${info.textoColor}`}
                  icon="IconCopy"
                ></Icons>
              </div>
              <p>{info.titularCuenta}</p>
            </div>
          </div>

          <p className="text-[.9rem] text-gray-600">
            <strong>Nota:</strong> Debes transferir el{" "}
            <strong>monto total</strong> de tu pedido. Una vez lo hagas, toma
            captura del pago y finaliza el pedido. Te pediremos vía Whatsapp tu
            comprobante de pago para seguir con la entrega.
            {/* <span onClick={() => modal?.open()} className="underline">
              Más información
            </span> */}
          </p>
        </>
      )}
    </div>
  );
}
