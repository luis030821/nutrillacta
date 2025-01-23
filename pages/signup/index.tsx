import Registrarse from "@/infraestructure/signin/Registrarse";
import { NextSeo } from "next-seo";
import React from "react";

export default function index() {
  return (
    <>
      {" "}
      <NextSeo
        title="Registrarse en Nutrillacta"
        description="Al resgistrarte en nuestra web entras a un programa que te beneficia con regalos en tus compras"
      />
      <Registrarse />
    </>
  );
}
