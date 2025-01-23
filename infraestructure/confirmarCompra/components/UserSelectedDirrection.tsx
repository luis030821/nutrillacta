import { estimated } from "@/backend/pedidosInfo";
import usePedidosYa from "@/backend/usePedidosYa";
import { useCart } from "@/context/CartContext";
import useMessage from "@/context/message/useMessage";
import { useData } from "@/context/withContext";
import { Address, User } from "@/interface";
import { Icons } from "@llampukaq/icons";
import { useUser } from "@llampukaq/realm";
import React, { useEffect, useState } from "react";
import { useConfirmarCompra } from "../context/ConfirmarCompraProvider";
import PickUpBoton from "@/components/confirmar_compra/PickUpBoton";
import { useAddressInfo } from "@/context/address/AddressContext";
import useMainContext from "@/context/useMainContext";
import { DirrecionMapa } from "@/components/confirmar_compra/MapaForm";
import { useUserAddress } from "@/hooks/useAddressUser";
function UserSelectedDirrection({
  modalFueraDeAlcance,
  modalDirrection,
}: {
  modalFueraDeAlcance: any;
  modalDirrection: any;
}) {
  const { onPc } = useMainContext();
  const { user } = useUser<User>();
  const { addressInfo, selectedLocalidad } = useAddressInfo();
  const { messagePromise } = useMessage();
  const { estimateShipingOrder } = usePedidosYa();
  const { products } = useData();
  const { setOrder } = useConfirmarCompra();
  const { shop } = useCart();
  const [
    mostrarFormularioMapaValidoSoloPc,
    setmostrarFormularioMapaValidoSoloPc,
  ] = useState(false);
  const {
    fee60,
    setAddressId,
    addressId,
    errorFromPedidosYa,
    totalPriceDelivery,
  } = useConfirmarCompra(); //@ts-ignore
  const filter = addressInfo.filter((x) => x.email != undefined);
  const { address } = useUserAddress();
  const Direcciones = ({
    address,
    index,
  }: {
    address: Address;
    index: number;
  }) => {
    const data = async () => {
      if (addressId != address.addressId) {
        messagePromise(
          async () => {
            try {
              setAddressId(address.addressId);
              const re = await estimateShipingOrder(
                estimated(
                  user?.email,
                  {
                    latitude: address.map.lat,
                    longitude: address.map.lng,
                    addressStreet: address.address_line1,
                    addressAdditional: address.reference,
                    city: address.city,
                    name: address.who,
                    phone: `+593${Number(address.phone)}`,
                  },
                  shop.map((shop) => {
                    const index = parseFloat(
                      shop.productId.charAt(shop.productId.length - 1)
                    );
                    const product = products.find(
                      (x) =>
                        x.productId ==
                        shop.productId.substring(0, shop.productId.length - 1)
                    );
                    return {
                      type: "FRAGILE",
                      value: product?.variants[index].price,
                      description: `${product?.title} ${product?.variants[index].name}`,
                      sku: shop.productId,
                      quantity: shop.count,
                      volume: 2000,
                      weight: 1,
                    };
                  })
                )
              );
              setOrder(re);
            } catch (error) {
              //@ts-ignore
              setOrder(undefined);
              modalFueraDeAlcance.open();
              throw new Error();
            }
          },
          {
            pending: "Estimando tarifa de envío...",
            success: "Estimación con éxito",
            error: "Fuera de alcance",
          }
        );
      }
    };
    useEffect(() => {
      //@ts-ignore
      if (selectedLocalidad?.who != undefined) {
        //@ts-ignore
        if (selectedLocalidad?.addressId == address?.addressId) data();
      }
    }, []);
    return (
      <div className="flex flex-col border-b-[1px]  ">
        <div
          id={`direccion` + index}
          onClick={data}
          className={`relative shrink-0  flex items-center gap-2 p-4  `}
        >
          <div className="">
            <div
              className={` w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center ${
                addressId == address.addressId ? "bg-orange-500" : "bg-white"
              }`}
            >
              {addressId == address.addressId && (
                <div className="w-3 h-3 bg-white rounded-full"></div>
              )}
            </div>
          </div>
          <label htmlFor={`direccion` + index} className=" text-[.9rem]">
            {address.name}
          </label>
        </div>{" "}
        <p className="px-4 pb-4 text-zinc-800/70 text-sm">
          {addressId == address.addressId && (
            <div className="flex flex-col">
              <span>Dirección:{address.formatted}</span>
              <span>Telefono:{address.phone}</span>
            </div>
          )}
        </p>
        {totalPriceDelivery != 0 && addressId == address.addressId && (
          <div className="text-[.9rem] pl-4  w-full text-gray-600  ">
            <p className="text-[.9rem] text-gray-600">
              <p className={`mb-3 ${addressId == "PICKUP" ? "hidden" : ""}`}>
                Costo de envío: <strong>${Number(fee60).toFixed(2)}</strong>{" "}
              </p>
            </p>
          </div>
        )}
        {errorFromPedidosYa && (
          <>
            <strong className="text-red-500">
              Error con el proveedor de envio:
            </strong>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-0 overflow-y-hidden overflow-x-auto h-max w-full">
      <>
        <div className="flex  z-[0] overflow-x-auto flex-col ">
          {[...(address ?? []), ...filter].map((address, index) => (
            <Direcciones index={index} address={address} />
          ))}
        </div>
        <PickUpBoton />
        <div className="">
          <div
            onClick={() => {
              onPc
                ? setmostrarFormularioMapaValidoSoloPc(
                    !mostrarFormularioMapaValidoSoloPc
                  )
                : modalDirrection.open();
            }}
            className={`shrink-0 bg-white hover:bg-black/10 cursor-pointer text-paleta-900 border-t-[1px] border-b-[1px] gap-2 p-4 flex justify-start items-center w-full h-[54px]`}
          >
            <div className="border-2 border-black/20  rounded-full p-1 min-h-[14px]">
              <Icons
                size={14}
                className="stroke-black/50"
                icon="IconPlus"
              ></Icons>
            </div>
            <label className=" text-[.9rem] font-bold text-black/40">
              Nueva dirección
            </label>
          </div>
          <div>
            {onPc && mostrarFormularioMapaValidoSoloPc && (
              <DirrecionMapa
                setmostrarFormularioMapaValidoSoloPc={
                  setmostrarFormularioMapaValidoSoloPc
                }
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default UserSelectedDirrection;
