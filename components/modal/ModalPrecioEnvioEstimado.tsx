import Mapa, { locale } from "@/components/map/Map";
import { Icons } from "@/icons";
import React, { useEffect, useState } from "react";
import { modal } from "../modal/Modal";
import { useAddressInfo } from "@/context/address/AddressContext";
import MapaRefactorizado from "../map/MapaRefactorizado";
import { useDebounce, useGeolocation } from "@uidotdev/usehooks";
import { LocationData } from "@/interface";
import client from "@/client";
interface PropLugar {
  formated1: string;
  price: string;
  coordenadas: [number, number];
  route?: {
    distance?: number;
  };
}

export interface PropLugarEstimado {
  formated1: string;
  price: string;
  coordenadas: [number, number];
  default?: boolean;
  route?: { distance?: number };
}
export const ModalPrecioEnvioEstimado = ({
  update,
  setupdate,
  modal,
  wich,
}: {
  update: any;
  setupdate: any;
  modal?: modal;
  wich?: PropLugar;
}) => {
  const { convertirMetrosAKilometrosConTiempo, localidadesPredefinidas } =
    useAddressInfo();

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const { latitude, longitude, loading, error } = useGeolocation();
  const [oneMore, setoneMore] = useState(false);
  const [pedienteEstimacion, setpedienteEstimacion] = useState(false);
  const [outOfZone, setoutOfZone] = useState(false);
  const { getAddressInfo, estimacionInfo, reset } = useAddressInfo();

  useEffect(() => {
    if (modal?.value == false) {
      setoutOfZone(false);
    }
  }, []);
  const cambiosDesdeUsuarioCoordenadas = (e: any) => {
    setUserLocation([e.lat, e.lng]);
  };
  const estimarPrecioBoton = async () => {
    reset();
    setoutOfZone(false);
    setpedienteEstimacion(true);
    var res = await getAddressInfo({
      //@ts-ignore
      map: { lat: userLocation[0], lng: userLocation[1] },
      saveInfo: false,
    });
    setpedienteEstimacion(false);

    if (!res) {
      setoutOfZone(true);
    }
  };

  const saveAdress = async () => {
    setpedienteEstimacion(true);
    var res = await getAddressInfo({
      //@ts-ignore
      map: { lat: userLocation[0], lng: userLocation[1] },
      saveInfo: true,
    });
    res;
    modal?.close();
    setpedienteEstimacion(false);
    setupdate(!update);
  };
  const [street1, setStreet] = useState("");
  const street = useDebounce(street1, 500);
  const [places, setPlaces] = useState<LocationData[]>();
  const [mapPlace, setMapPlace] = useState<locale>();

  const findAddress = async () => {
    const res = await fetch(`${client.llampukaq}/v1/geo/places`, {
      method: "POST",
      body: JSON.stringify({ place: street }),
    });
    setPlaces(await res.json());
  };
  useEffect(() => {
    //@ts-ignore
    setUserLocation([latitude, longitude]);
  }, []);
  useEffect(() => {
    if (street != "") {
      findAddress();
    }
  }, [street]);

  return (
    <div className="mt-3 w-full">
      <input
        onChange={(e) => {
          setStreet(e.target.value);
          const findPlace = places?.find((x) => x.formatted == e.target.value);
          if (findPlace != undefined) {
            setMapPlace({ lat: findPlace?.lat, lng: findPlace?.lon });
          }
        }}
        placeholder="Nombre de la calle"
        list="listPlaces"
      />
      <datalist id="listPlaces">
        {places?.map((x) => (
          <option value={x.formatted}>{x.formatted}</option>
        ))}
      </datalist>
      {error && (
        <>
          <p className="text-[.8rem] text-black/90 bg-green-500/40 p-2 rounded-md flex gap-2 items-center mb-1">
            <Icons size={18} icon="IconCheck"></Icons>
            <p>
              Activa la ubicación y permite a la página usarla, una vez lo
              hagas,{" "}
              <span
                onClick={() => setoneMore(!oneMore)}
                className="underline cursor-pointer"
              >
                da click aquí
              </span>{" "}
              para obtener tu ubicación precisa
            </p>
          </p>
        </>
      )}
      <div className="h-80 lg:h-full text-[.8rem] text-gray-600 relative">
        {userLocation && userLocation[0] && userLocation[1] ? (
          <div className="relative">
            <div className="flex gap-2  absolute bottom-[56px] lg:bottom-10 left-1 z-[2] ">
              {localidadesPredefinidas.map((e, ind) => (
                <span
                  key={"asd" + ind}
                  onClick={() => {
                    setUserLocation([e.coordenadas[0], e.coordenadas[1]]);
                  }}
                  className="cursor-pointer border bg-white/90 px-4 rounded-[3px] lg:rounded-[9px] text-[.7rem] lg:text-[1.1rem]"
                >
                  {e.formated1}
                </span>
              ))}
            </div>

            <MapaRefactorizado
              lat={mapPlace?.lat}
              lng={mapPlace?.lng}
              onClick={(e: any) => {
                cambiosDesdeUsuarioCoordenadas(e);
              }}
            />
            <p className=" my-2 lg:text-[1rem]">
              ¿Tu domicilio está en {wich?.formated1 ?? "..."}? Precisa tu
              dirección para seguir con el estimado de envío.
            </p>
          </div>
        ) : (
          <>
            <div className="w-full h-full  ">
              <Mapa
                byUser
                onClick={(e: any) => {
                  cambiosDesdeUsuarioCoordenadas(e);
                }}
              />
            </div>
            <p className=" my-2">
              Arrastra el icono hasta donde esté tu domicilio o lugar de
              entrega.
            </p>
          </>
        )}
        {estimacionInfo && estimacionInfo.formated1 && (
          <>
            <table className="w-full text-[.9rem] font-medium mb-2 lg:pb-3 border-b-[1px] border-black/10">
              <tbody>
                <tr>
                  <td className="text-paleta-800/70 min-w-[90px]">
                    Nombre del lugar:
                  </td>
                  <td>{estimacionInfo.formated1}</td>
                </tr>
                <tr>
                  <td className="text-paleta-800/70 min-w-[90px]">
                    Precio del envío:
                  </td>
                  <td>${estimacionInfo.price}</td>
                </tr>{" "}
                <tr>
                  <td className="text-paleta-800/70 min-w-[90px]">
                    Tiempo estimado de entrega:
                  </td>
                  <td>
                    {
                      convertirMetrosAKilometrosConTiempo(
                        estimacionInfo?.route?.distance
                          ? estimacionInfo?.route?.distance
                          : 0
                      ).tiempoEstimado
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            {!outOfZone && (
              <>
                <p className="mb-2 lg:text-[1rem] ">
                  <strong className="">Aplica envío rápido</strong>
                </p>
              </>
            )}
          </>
        )}
        {outOfZone && (
          <div className="bg-red-500 p-2 mb-2 rounded-[7px]">
            <p className=" text-red-50">
              <strong>No aplica envío rápido</strong>, la zona que marcaste está
              lejos de nuestro área de servicio. El envío puede que tarde unas
              horas o días.
            </p>
          </div>
        )}
        <div className="flex justify-end gap-2 items-center pt-4  border-t rounded-b border-black/10">
          {estimacionInfo && estimacionInfo.formated1 ? (
            <>
              <button
                onClick={estimarPrecioBoton}
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 h-full text-sm lg:text-md font-medium border border-paleta-800/30 text-paleta-800/50  rounded-lg"
              >
                Estimar nuevamente
              </button>
              <button
                onClick={saveAdress}
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-paleta-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {pedienteEstimacion
                  ? "Guardando..."
                  : "  Guardar esta ubicación"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={modal?.close}
                data-modal-hide="static-modal"
                type="button"
                className="py-2.5 px-5 ms-3 h-full text-sm lg:text-[1rem] font-medium border border-paleta-800/30 text-paleta-800/50  rounded-lg"
              >
                Cerrar
              </button>
              <button
                onClick={estimarPrecioBoton}
                data-modal-hide="static-modal"
                type="button"
                disabled={pedienteEstimacion}
                className="text-white bg-paleta-800 font-medium rounded-lg text-sm lg:text-[1rem] px-5 py-2.5 text-center "
              >
                {pedienteEstimacion
                  ? "Calculando..."
                  : "  Estimar precio de envío"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
