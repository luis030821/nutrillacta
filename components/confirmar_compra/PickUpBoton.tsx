import { useConfirmarCompra } from "@/infraestructure/confirmarCompra/context/ConfirmarCompraProvider";
import React from "react";
import Modal, { useModal } from "../modal/Modal";

export default function PickUpBoton() {
  const { addressId, setAddressId, setOrder } = useConfirmarCompra();
  const modaPickup = useModal();
  const mapLink =
    "https://www.google.com/maps/place/Licorer%C3%ADa+Spondylus/@-0.2101856,-78.401727,18.09z/data=!4m6!3m5!1s0x91d5910059e2bc93:0x8498fb8684965190!8m2!3d-0.2093466!4d-78.4016459!16s%2Fg%2F11lds01shb?entry=ttu";

  return (
    <div className="h-full">
      <Modal oldModal modal={modaPickup} title="Retirar en local físico">
        <div className="text-[.8rem]">
          Al poner esta opción tendremos la orden lista para cuando llegues a
          nuestro local, la retires y pagues el valor correspondiente. Además la
          tarifa de envío será $0.00.
        </div>
      </Modal>{" "}
      <div
        id="pickupBtn"
        onClick={() => {
          //@ts-ignore
          setOrder(undefined);
          addressId == "PICKUP"
            ? //@ts-ignore
              setAddressId(undefined)
            : setAddressId("PICKUP");
        }}
        className="flex items-center gap-2 p-4"
      >
        <div className="h-max">
          <div
            className={` w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center ${
              addressId == "PICKUP" ? "bg-orange-500" : "bg-white"
            }`}
          >
            {addressId == "PICKUP" && (
              <div className="w-3 h-3 bg-white rounded-full"></div>
            )}
          </div>
        </div>

        <label htmlFor="pickupBtn" className=" text-[.9rem]">
          Voy a retirar mi compra en el local físico{" "}
        </label>
        <span
          onClick={() => modaPickup.open()}
          className="text-sm mx-2 px-[6px] shadow-sm border  rounded-full border-[#e0e0e0]"
        >
          ?
        </span>
      </div>
    </div>
  );
}
