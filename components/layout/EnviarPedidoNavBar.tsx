import { Icons } from "@/icons";
import React, { useEffect, useRef, useState } from "react";
import Modal, { useModal } from "../modal/Modal";
import Mapa from "../map/Map";
import { ModalPrecioEnvioEstimado } from "../modal/ModalPrecioEnvioEstimado";
import { useAddressInfo } from "@/context/address/AddressContext";
import P from "../html/P";
import useMainContext from "@/context/useMainContext";
import LugaresDelUsuarioYPredeterminados from "./LugaresDelUsuarioYPredeterminados";
import { useUserAddress } from "@/hooks/useAddressUser";
import { Address } from "@/interface";

interface PropLugar {
  formated1: string;
  price: string;
  coordenadas: [number, number];
  default?: boolean;
}
export default function EnviarPedidoNavBar() {
  const { onPc } = useMainContext();
  const {
    addressInfo,
    updateLocation,
    selectedLocalidad,
    showDropdown,
    modalMap,
    setShowDropdown,
    setAddressInfo,
  } = useAddressInfo();
  const [wich, setwich] = useState<PropLugar>();
  const modalDelete = useModal();
  const [updateLocal, setupdate] = useState(false);
  const [locationSee, setlocationSee] = useState<PropLugar | undefined>();
  const { deleteAddress } = useUserAddress();

  const [clicked, setclicked] = useState(false);
  const handleLocalidadChange = (localidad: PropLugar) => {
    setclicked(true);
    setwich(localidad);
    //@ts-ignore
    updateLocation(localidad);
    setShowDropdown(false);
    if (localidad.default) {
      modalMap.open();
    }
  };

  const handleUpdateLocationSee = (newLocation: PropLugar) => {
    modalDelete.open();
    setlocationSee(newLocation);
  };

  const modalDropdown = useModal();

  useEffect(() => {
    if (!onPc) {
      if (showDropdown) {
        modalDropdown.open();
      } else {
        modalDropdown.close();
        document.body.classList.remove("overflow-y-hidden");
        document.body.classList.add("overflow-y-scroll");
      }
    }
  }, [showDropdown]);

  return (
    <>
      <Modal
        full={!onPc}
        showBottom={false}
        title="Estimar precio de envío"
        modal={modalMap}
      >
        <ModalPrecioEnvioEstimado
          update={updateLocal}
          setupdate={setupdate}
          wich={wich ?? undefined}
          modal={modalMap}
        />
      </Modal>
      <Modal
        modal={modalDelete}
        full={!onPc}
        showBottom={false}
        title={wich?.formated1 ? wich?.formated1 : ""}
      >
        <p className="text-[.9rem] lg:text-[1.2rem] text-gray-600">
          Únicamente puedes ver o eliminar esta dirección, no puedes editarla.
        </p>
        <div className="flex gap-3 mb-5">
          <button
            className="mt-2  text-paleta-100 px-4 py-1 rounded-[5px] border-[1px] border-paleta-100"
            onClick={modalDelete.close}
          >
            Regresar
          </button>
          <button
            className="mt-2 bg-paleta-100 px-4 py-1 rounded-[5px] text-white font-medium"
            onClick={async () => {
              //@ts-ignore
              if (wich?.who != undefined) {
                //@ts-ignore
                await deleteAddress(wich?.addressId);
              } else {
                const res = addressInfo.filter(
                  (x) => wich?.formated1 != x?.formated1
                );
                //@ts-ignore
                setAddressInfo(res);
              }

              modalDelete.close();
            }}
          >
            Eliminar dirección
          </button>
        </div>
        <div className="h-80 text-[.8rem] text-gray-600">
          <Mapa
            onClick={() => {}}
            byUser
            lat={locationSee?.coordenadas[0]}
            lng={locationSee?.coordenadas[1]}
          />
        </div>
      </Modal>
      <div className="relative mpx] w-full py-2 text-[.9rem] bg-blaze-orange-100  text-gray-600 lg:text-gray-900 flex flex-col items-center justify-center  border-b-[1px] border-t-[1px] border-gray-200">
        {showDropdown && (
          <div onClick={() => setShowDropdown(false)} className="">
            {" "}
            <Icons
              size={28}
              className="stroke-[#82330c] absolute top-2 right-2 "
              icon="IconX"
            ></Icons>
          </div>
        )}
        <span
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <P className="flex gap-2 items-center">
            Entregar mi pedido en:{" "}
            <span className="flex items-center border border-[#82330c] text-[#82330c] gap-1 rounded-[6px] px-4 cursor-pointer">
              <span className="">
                {!onPc ? (
                  <>
                    {" "}
                    {selectedLocalidad?.formated1?.split("").length > 17
                      ? selectedLocalidad?.formated1.slice(0, 17) + "..."
                      : selectedLocalidad?.formated1}
                  </>
                ) : (
                  <>
                    {" "}
                    {selectedLocalidad?.formated1?.split("").length > 30
                      ? selectedLocalidad?.formated1.slice(0, 30) + "..."
                      : selectedLocalidad?.formated1}
                  </>
                )}{" "}
                {}
              </span>

              <span className="flex items-center justify-center w-[18px] h-[18px]  ">
                <Icons
                  className={`stroke-[#82330c] transition-all duration-75 ${
                    showDropdown ? "rotate-0" : "-rotate-90"
                  } `}
                  size={18}
                  icon="IconCaretDown"
                />
              </span>
            </span>
          </P>{" "}
        </span>
      </div>
      {showDropdown && (
        <>
          {onPc ? (
            <LugaresDelUsuarioYPredeterminados
              handleUpdateLocationSee={handleUpdateLocationSee}
              handleLocalidadChange={handleLocalidadChange}
            />
          ) : (
            <>
              <Modal modal={modalDropdown} title="s" onlyChildren>
                <div className="mt-[112px]">
                  <LugaresDelUsuarioYPredeterminados
                    handleUpdateLocationSee={handleUpdateLocationSee}
                    handleLocalidadChange={handleLocalidadChange}
                  />
                </div>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
}
