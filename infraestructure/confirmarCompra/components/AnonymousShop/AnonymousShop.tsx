import SeguirPorWhastapp from "@/components/confirmar_compra/SeguirPorWhastapp";
import Resumen from "@/infraestructure/home/Resumen";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useBoolean } from "usehooks-ts";
import { useConfirmarCompra } from "../../context/ConfirmarCompraProvider";
import Button from "@/components/button/Button";
import useMessage from "@/context/message/useMessage";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { Icons } from "@/icons";
import Mapa, { locale, MapPrint } from "@/components/map/Map";
import ModalTrigger from "@/components/ModalTrigger";
import { modal } from "@/components/modal/OldModal";
import { fr } from "@/hooks/useAddress";
import usePedidosYa from "@/backend/usePedidosYa";
import { estimated } from "@/backend/pedidosInfo";
import { useData } from "@/context/withContext";
function AnonymousShop() {
  const {
    addressId,
    setAddressId,
    methodPayment,
    loading,
    setLoading,
    onSuccessOrderCreate,
    price,
    setMethodPayment,
    setOrder,
  } = useConfirmarCompra();
  const isDelivery = useBoolean();
  const { shop } = useCart();
  const router = useRouter();
  useEffect(() => {
    addressId == "PICKUP" && isDelivery.setValue(false);
  }, [addressId]);
  const { message, messagePromise } = useMessage();
  const [data, setData] = useState({
    street: "",
    informationAddress: "",
    who: "",
    phone: "",
    instructions: "",
    city: "",
  });
  const onClick = async () => {
    if (addressId == undefined) {
      message({
        type: "alert",
        description: "Selecciona una dirección",
      });
    }
    if (addressId != undefined) {
      setLoading(true);
      if (methodPayment == "tranfer") {
        await onSuccessOrderCreate({ anonymous: data });
        setLoading(false);
      }
      if (methodPayment == "cash") {
        await onSuccessOrderCreate({ anonymous: data });
      }
      if (methodPayment == "card") {
        const res = document.querySelector("#paypalFormCredit");
        //@ts-ignore
        res?.click();
      }
    }
  };
  useEffect(() => {
    if (shop.length < 1) {
      router.push("/");
    }
  }, []);
  const createOrder = () => {
    loading
      ? message({
          type: "alert",
          description: "Se está generando la orden de pago",
        })
      : onClick();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [map, setMap] = useState<locale>();
  const getGeo = async (data: any) => {
    const geocoding = `https://api.geoapify.com/v1/geocode/reverse?lat=${data.map.lat}&lon=${data.map.lng}&format=json&apiKey=760e09eb6c6145abacba68e479c18ee1`;
    messagePromise(
      async () => {
        //@ts-ignore
        const res: typeof fr = await (await fetch(geocoding)).json();
        const {
          datasource,
          lon,
          lat,
          distance,
          name,
          city,
          timezone,
          bbox,
          result_type,
          ...g
        } = res.results[0];

        setData({ ...data, street: g.street, city });
      },
      {
        error: "Error en la estimacion de ubicacion",
        pending: "Estimando ubicacion",
        success: "Ubicacion estimada correctamente",
      }
    );
  };
  const { estimateShipingOrder } = usePedidosYa();
  const { products } = useData();
  return (
    <div className="p-10 flex flex-col lg:flex-row justify-center lg:space-x-10">
      <div className="max-w-[500px] ">
        <div className="flex flex-col gap-2 p-2 lg:p-0 bg-paleta-200 lg:bg-transparent ">
          <div className="flex gap-2 items-center w-full justify-between">
            <Link
              href={"/cart"}
              className="underline text-blue-500  text-sm lg:text-[1rem] "
            >
              Editar carrito
            </Link>
          </div>
          <div className="">
            <Resumen />
          </div>
        </div>
        <div className="my-4">
          <SeguirPorWhastapp />
        </div>
      </div>
    </div>
  );
}

export default AnonymousShop;
const MapSelect = ({
  modal,
  onClick,
}: {
  modal: modal;
  onClick: (data: locale) => void;
}) => {
  const [map, setMap] = useState<locale>();
  return (
    <>
      <div className="w-full aspect-video">
        <Mapa
          lat={map?.lat}
          lng={map?.lng}
          onClick={(e) => {
            setMap(e);
          }}
        />
        <Button
          onClick={() => {
            modal.close();
            //@ts-ignore
            onClick?.(map);
          }}
        >
          Selecionar
        </Button>
      </div>
    </>
  );
};
