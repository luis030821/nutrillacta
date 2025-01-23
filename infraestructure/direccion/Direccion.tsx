import { Icons } from "@llampukaq/icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Direccion() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://www.licoreriaspondylus.com/direccion`}
        />
        <title>Dirección | Nutrillacta</title>
        <meta
          name="description"
          content={`Esta ubicada en Tumbaco. Intersección entre Gonzalo Pizarro y Gonzalo
              Meneses. A una cuadra del cementerio`}
        />
      </Head>
      <div className="flex flex-col items-center mt-3 p-3">
        <div className="w-full max-w-[550px]">
          <div className="w-full items-start">
            <h1 className="text-[1.2rem]">Dirección de Nutrillacta</h1>
            <p className="text-[.9rem] py-2">
              Ubicada en Tumbaco. Intersección entre Gonzalo Pizarro y Gonzalo
              Meneses. A una cuadra del cementerio{" "}
            </p>
          </div>
          <h2 className="text-[.9rem] font-medium">
            Dirección en google maps:
          </h2>
          <iframe
            className="w-full h-[450px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.723955091913!2d-78.40140038846633!3d-0.2095323254906829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5910059e2bc93%3A0x8498fb8684965190!2sLicorer%C3%ADa%20Spondylus!5e0!3m2!1ses-419!2sec!4v1712890100485!5m2!1ses-419!2sec"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <Link className="w-max " href={"/menu"}>
            <div className="mt-3 ">
              <button className="px-5 py-2 rounded-lg flex gap-4 items-center border bg-paleta-100">
                <Icons
                  className="stroke-paleta-300  pl-[6px]"
                  size={20}
                  icon="IconShoppingCartPlus"
                ></Icons>
                <span className="text-paleta-300 font-medium">
                  {" "}
                  Comenzar a comprar
                </span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
