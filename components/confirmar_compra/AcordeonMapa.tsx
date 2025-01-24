import React, { useState } from "react";
import { DirrecionMapa } from "./MapaForm";
import { Icons } from "@/icons";
import Modal, { useModal } from "../modal/Modal";
import { ModalAddDirection } from "@/infraestructure/me/MePages/Dirrection";
import PickUpBoton from "./PickUpBoton";
export default function AcordeonMapa() {
  const [mostrarMapa, setmostrarMapa] = useState(false);
  const modalDirrection = useModal();
  return (
    <div className="flex flex-col ">
      <Modal
        showBottom={false}
        modal={modalDirrection}
        title="Agregar una dirección"
      >
        <ModalAddDirection modal={modalDirrection} />
      </Modal>
      <div className="h-max ">
        <div className="">
          <div
            onClick={() => modalDirrection.open()}
            className={`shrink-0 bg-white text-paleta-900 border-t-[1px] border-b-[1px] gap-2 p-4 flex justify-start items-center w-full h-[54px]`}
          >
            <div className="border-2 border-paleta-100 rounded-full p-1 min-h-[14px]">
              <Icons
                size={14}
                className="stroke-paleta-100 "
                icon="IconPlus"
              ></Icons>
            </div>
            <label className=" text-[.9rem] font-bold">Nueva dirección</label>
          </div>
        </div>
      </div>
      <div
        className={`pl-2 h-full transition-all duration-200 overflow-hidden ${
          mostrarMapa ? "max-h-[650px]" : "max-h-[0px]"
        }`}
      >
        <DirrecionMapa />
      </div>
      <div>
        <PickUpBoton />
      </div>
    </div>
  );
}
