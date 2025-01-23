import Img from "@/components/img/Img";
import useMessage from "@/context/message/useMessage";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import React from "react";

function Transferia() {
  const banksData = [
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
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const { messagePromise } = useMessage();
  return (
    <div className="py-5 space-y-5">
      <p>Haz click para copiar el numero de cuentas</p>
      {banksData.map((bank, index) => (
        <div
          onClick={async () => {
            messagePromise(
              async () => {
                await copyToClipboard(bank.numeroCuenta);
              },
              {
                error: "Error al copiar",
                pending: "Copiando numero de cuenta",
                success: `Numero de cuenta ${bank.name} copiado`,
              }
            );
          }}
          key={index}
          className={`bg-[${bank.bgColor}] w-full rounded-3xl p-5 flex items-center space-x-5`}
        >
          <div className="max-w-[40px]">
            <Img src={`${bank.imgSrc}`}></Img>
          </div>
          <div>
            <h1>Banco de Pichincha</h1>
            <h1>{bank.numeroCuenta}</h1>
            <h1>Ortega Garrido Luis Alberto</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transferia;
