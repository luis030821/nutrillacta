import { useAddressInfo } from "@/context/address/AddressContext";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { PropLugarEstimado } from "../modal/ModalPrecioEnvioEstimado";
import { Icons } from "@/icons";
import Table from "../html/Table";
import { useUserAddress } from "@/hooks/useAddressUser";
export default function LugaresDelUsuarioYPredeterminados({
  handleLocalidadChange,
  handleUpdateLocationSee,
}: {
  handleUpdateLocationSee?: (newLocation: PropLugarEstimado) => void;
  handleLocalidadChange: (localidad: PropLugarEstimado) => void;
}) {
  const [mostrarPredeterminado, setmostrarPredeterminado] = useState(false);
  const {
    addressInfo,
    localidadesPredefinidas,
    selectedLocalidad,
    modalMap,
    setShowDropdown,
  } = useAddressInfo();
  const ref = useRef(null);

  useEffect(() => {
    if (!selectedLocalidad.default) {
      setmostrarPredeterminado(false);
    } else {
      setmostrarPredeterminado(true);
    }
  }, [selectedLocalidad]);

  const handleClickOutside = () => {
    // Your custom logic here
    setShowDropdown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleButton = () => {
    modalMap.toggle();
    setShowDropdown(false);
  };
  const Predeterminados = ({ custom }: { custom: boolean }) => {
    const { address } = useUserAddress();
    const newAddress = address.map((x): PropLugarEstimado => {
      return {
        coordenadas: [x.map.lat, x.map.lng],
        formated1: x.name,
        price: "2",
        default: false,
        route: { distance: 0 },
        ...x,
      };
    });
    if (custom) {
      const headers = ["Nombre lugar", "Precio", "Opciones"];
      const rows: { lugar: PropLugarEstimado; precio: string }[] = [
        ...newAddress,
        ...addressInfo,
      ].map((localidad: PropLugarEstimado) => ({
        lugar: localidad,
        precio: Number(localidad.price)
          ? Number(localidad.price).toFixed(2)
          : localidad.price,
      }));
      return (
        <Table
          handleUpdateLocationSee={handleUpdateLocationSee}
          headers={headers}
          rows={rows}
          onRowClick={handleLocalidadChange}
        />
      );
    } else {
      const headers = ["Lugar", "Precio aproximado"];
      const rows: { lugar: PropLugarEstimado; precio: string }[] = [
        ...localidadesPredefinidas,
      ].map((localidad: PropLugarEstimado) => ({
        lugar: localidad,
        precio: Number(localidad.price)
          ? Number(localidad.price).toFixed(2)
          : localidad.price,
      }));
      return (
        <Table
          headers={headers}
          rows={rows}
          onRowClick={handleLocalidadChange}
        />
      );
    }
  };
  return (
    <div
      ref={ref}
      className={`mt-2 w-[98%] mx-auto border lg:shadow-lg lg:w-full lg:max-w-[600px] lg:mx-auto  bg-white border-blaze-orange-400 lg:border-black/10 rounded-md overflow-hidden flex flex-col justify-center items-center `}
    >
      <div className="divide-x-2 divide-black/10 text-gray-600 flex w-full gap-2 lg:text-[1.2rem] py-3 lg:mb-2">
        <span
          onClick={() => setmostrarPredeterminado(true)}
          className={`w-1/2 flex text-center justify-center items-center`}
        >
          <h2
            className={`cursor-pointer  ${
              mostrarPredeterminado
                ? "border-b-[2px] text-gray-900 border-blaze-orange-400"
                : ""
            }`}
          >
            Predeterminados
          </h2>
        </span>
        <span
          onClick={() => setmostrarPredeterminado(false)}
          className={`w-1/2 flex text-center justify-center items-center`}
        >
          <h2
            className={`cursor-pointer  ${
              !mostrarPredeterminado
                ? "border-b-[2px] text-gray-900 border-blaze-orange-400"
                : ""
            }`}
          >
            Míos
          </h2>
        </span>
      </div>
      {mostrarPredeterminado ? (
        <>
          <div className="max-w-[400px] w-full">
            <Predeterminados custom={false} />
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[400px] w-full">
            <Predeterminados custom={true} />
          </div>
        </>
      )}

      <div
        onClick={handleButton}
        className="px-5 py-3 mb-2 rounded-full text-white hover:bg-blaze-orange-600 bg-blaze-orange-400 w-max  mt-4 cursor-pointer text-sm mx-auto flex gap-1 items-center justify-center hover:underline "
      >
        <Icons className="stroke-white" size={18} icon="IconLocation" />
        Agregar dirección y simular precio de envío
      </div>
    </div>
  );
}
