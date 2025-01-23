import client from "@/client";
import { Icons } from "@llampukaq/icons";
import React from "react";

export default function WhatsappButtonPc() {
  return (
    <div className="fixed bottom-4 right-4">
      {" "}
      <a
        className="flex justify-center gap-2 items-center rounded-full bg-white hover:bg-blaze-orange-50 px-5 py-2"
        target="_blank"
        referrerPolicy="no-referrer"
        href={`https://api.whatsapp.com/send?phone=593${Number(
          client.celular
        )}&text=${"Hola, "}`}
      >
        <p className="font-[500] text-[1.3rem] text-[#25d366] mx-auto">
          {"Whatsapp"}
        </p>
        <div className={`flex min-h-[42px] justify-center relative`}>
          <Icons
            stroke={1.8}
            className="stroke-[#25d366]"
            size={42}
            icon={"IconBrandWhatsapp"}
          ></Icons>
        </div>
      </a>
    </div>
  );
}
