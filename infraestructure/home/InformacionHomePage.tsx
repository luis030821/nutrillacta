import React from "react";
import { Icons as I, ICONS, Icons } from "@llampukaq/icons";
import Link from "next/link";
import Button from "@/components/button/Button";
import Modal, { useModal } from "@/components/modal/Modal";
import { getGreeting } from "../cart/funciones";
import { useCart } from "@/context/CartContext";
import EnviarPedidoNavBar from "@/components/layout/EnviarPedidoNavBar";
import useMainContext from "@/context/useMainContext";
import client from "@/client";
interface Social {
  titulo: string;
  link: string;
  icon: ICONS;
}

export default function InformacionHomePage() {
  const { onPc } = useMainContext();
  const { shop, setShop } = useCart();
  const modaInfo = useModal();
  const smsW = `https://api.whatsapp.com/send?phone=593${Number(
    client.celular
  )}&text=${getGreeting()}. Tengo PEDIDO ESPECIAL. Quisiera seguir el proceso de compra, mis productos son: ${JSON.stringify(
    shop
  )}`;
  const datos: Social[] = [
    {
      titulo: "@licoreriaSpondylus",
      link: "https://www.facebook.com/profile.php?id=61557148134647",
      icon: "IconBrandFacebook",
    },
    {
      titulo: "@licoreriaSpondylus",
      link: "https://www.instagram.com/licoreriaspondylus/",
      icon: "IconBrandInstagram",
    },
    {
      titulo: "@LSpondylus81146",
      link: "https://twitter.com/LSpondylus81146",
      icon: "IconBrandTwitter",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-3 max-w-[1200px] mx-auto lg:py-12">
      <Modal oldModal modal={modaInfo} title=" Servicio a domicilio">
        <div className="bg-white rounded-md flex flex-col gap-3 text-[.9rem] justify-between">
          <div>
            <p>
              Garantizamos la entrega a{" "}
              <strong>domicilio en menos de 30 minutos</strong>. Esta oferta
              aplica únicamente para direcciones que se encuentren a menos de 20
              km a la redonda de nuestro local en Tumbaco. Arriba en el segmento
              "<strong>Enviar mi pedido a:</strong>" podrás ver hay envío rápido
              hasta tu domicilio.
            </p>
          </div>
        </div>
      </Modal>

      <section className="flex flex-col lg:w-1/3 border lg:border-none rounded-[10px] p-5">
        <div className="flex lg:flex-col lg:justify-center lg:items-center items-start">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 lg:w-24 lg:h-24 rounded-md lg:rounded-full bg-paleta-100">
              <Icons
                size={onPc ? 56 : 24}
                icon="IconCalendar"
                className="stroke-white"
              ></Icons>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium leadi lg:text-center lg:text-[1.4rem] lg:my-3 text-paleta-900">
              Horarios de atención
            </h4>
            <p className="mt-1 text-paleta-900/80 lg:text-[1rem] lg:text-center">
              De Martes a Domingo.
              <span className="block">Desde las 2pm hasta 2am.</span>
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col lg:w-1/3 border  lg:border-none  rounded-[10px] p-5">
        <div className="flex  lg:flex-col lg:justify-center lg:items-center items-start">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10  lg:w-24 lg:h-24 lg:rounded-full rounded-md bg-paleta-100">
              <Icons
                size={onPc ? 56 : 24}
                icon="IconMotorbike"
                className="stroke-white"
              ></Icons>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium leadi lg:text-center lg:text-[1.4rem] lg:my-3 text-paleta-900">
              Envío rápido
            </h4>
            <p className="mt-1 text-paleta-900/80  lg:text-center">
              Llevamos tus bebidas a domicilio en menos de 30 minutos.{" "}
              <span className="underline" onClick={() => modaInfo.open()}>
                Más información.
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col lg:w-1/3 border  lg:border-none  rounded-[10px] p-5">
        <div className="flex  lg:flex-col lg:justify-center lg:items-center items-start">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10  lg:w-24 lg:h-24 lg:rounded-full rounded-md bg-paleta-100">
              <Icons
                size={onPc ? 56 : 24}
                icon="IconPhoneCall"
                className="stroke-white"
              ></Icons>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium leadi lg:text-center lg:text-[1.4rem] lg:my-3 text-paleta-900">
              Contacto
            </h4>
            <p className="mt-1 text-paleta-900/80  lg:text-center">
              Para ayuda o información, contáctanos a través de{" "}
              <a
                className="underline"
                target="_blank"
                referrerPolicy="no-referrer"
                href={`https://api.whatsapp.com/send?phone=593${Number(
                  client.celular
                )}&text=${getGreeting()},${" "} `}
              >
                0959563276
              </a>
              .<span className="hidden">Teléfono:</span>
            </p>
          </div>
        </div>
      </section>

      <section className="hidden flex-col border rounded-[10px] p-5">
        <div className="flex">
          <div className="flex-shrink-0 mt-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-paleta-100">
              <Icons icon="IconSocial" className="stroke-white"></Icons>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium leadi text-paleta-900">
              Redes sociales
            </h4>
            <p className="mt-1 text-paleta-900/80">
              Recuerda seguirnos en todas nuestras redes para estar al tanto de
              nuestros avisos y promociones.
              <span className="flex justify-center items-center gap-12 mt-4">
                {datos.map((e) => (
                  <a
                    href={`${e.link}`}
                    target="_blank"
                    className="cursor-pointer flex flex-col gap-2 items-center"
                  >
                    <span>
                      <Icons
                        size={28}
                        className="stroke-paleta-900"
                        icon={e.icon}
                      ></Icons>
                    </span>
                  </a>
                ))}
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* <section className="flex gap-2 border rounded-[10px] p-5">
        <div className="p-3 bg-paleta-100 w-max flex items-center rounded-sm">
          <I className="stroke-paleta-300" size={30} icon="IconCheck"></I>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[1.2rem] font-bold   ">Horarios de atención</h1>
          <p>Abierto 24/7. </p>
        </div>
      </section> */}
      {/* <section className="flex flex-col border rounded-[10px] p-5">
        <I className="stroke-paleta-100" size={30} icon="IconMotorbike"></I>
        <div className="flex items-center gap-2 ">
          <h1 className="text-[1.2rem] font-bold  ">Fast Delivery</h1>
        </div>
        <p>
          Llevamos tus bebidas a domicilio en menos de 30 minutos. Realiza tu
          pedido a través de esta página web o mediante nuestro número de
          contacto.{" "}
          <span className="underline" onClick={() => modaInfo.open()}>
            Más información
          </span>
        </p>
      </section> */}

      {/* <section className="flex flex-col border rounded-[10px] p-5">
        <I className="stroke-paleta-100" size={30} icon="IconBook2"></I>
        <h1 className="text-[1.2rem] font-bold   ">Contacto</h1>
        <p>
          Si necesita ayuda o información, contáctanos a través de{" "}
          <a className="underline " href="mailto:licoreriaspondylus@gmail.com">
            licoreriaspondylus@gmail.com
          </a>{" "}
          o{" "}
          <a
            className="underline"
            referrerPolicy="no-referrer"
            href={`https://api.whatsapp.com/send?phone=593${Number(client.celular)}&text=${getGreeting()},${" "} `}
          >
            0959563276
          </a>
          .<span className="hidden">Teléfono:</span>
        </p>
        <p>
          <span className="hidden">Email:</span>
        </p>
      </section> */}
    </div>
  );
}
