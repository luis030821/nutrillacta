import Icons from "@/styles/Icons";
import { useRouter } from "next/router";
import React from "react";

export default function BotonDeVolver() {
  const router = useRouter();
  return (
    <div className="flex p-2 items-center relative  " onClick={router.back}>
      <div className="z-[2] fixed  top-[10px] bg-paleta-600 p-2 flex gap-2 rounded-[12px] items-center ">
        <Icons className="fill-none -rotate-[180deg]" icon="left"></Icons>
        <h1 className="font-bold text-[1.1rem]">Volver</h1>
      </div>
    </div>
  );
}
