import React, { useEffect, useState } from "react";

import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import useMensajeSimple from "../mensajes/UseMensajeSimple";
import useMainContext from "@/context/useMainContext";

export interface locale {
  lat: number;
  lng: number;
}
function Mapa({
  onClick,
  byUser,
  lat,
  lng,
}: {
  onClick: (e: locale) => void;
  byUser?: boolean;
  lat?: number;
  lng?: number;
}) {
  const { onPc } = useMainContext();
  const mostrarMensaje = useMensajeSimple();
  const [position, setPosition] = useState({
    lat: -0.21212506698661598,
    lng: -78.40443553650846,
  });
  const [desdeUsuario, setdesdeUsuario] = useState(false);
  const [positionMarker, setPositionMarker] = useState({
    lat: -0.2118828241577879,
    lng: -78.40463748023997,
  });
  useEffect(() => {
    onClick?.(positionMarker);
  }, [positionMarker]);
  useEffect(() => {
    if (desdeUsuario) return;
    if (byUser) {
      if (lat && lng) {
        setPosition({ lat, lng });
        setPositionMarker({
          lat,
          lng,
        });

        setdesdeUsuario(true);
      } else {
        setdesdeUsuario(false);
      }
    }
  }, [lat, lng]);

  const onMapDrag = (e: any) => {
    const newPosition = {
      //@ts-ignore
      lat: e[0],
      //@ts-ignore
      lng: e[1],
    };
    setPosition(newPosition);
    setPositionMarker(newPosition);
  };

  const getMap = () => {
    mostrarMensaje("Obteniendo ubicación...", 1000);
    setdesdeUsuario(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ lat: latitude, lng: longitude });
          setPositionMarker({ lat: latitude, lng: longitude });
          mostrarMensaje("Ubicación obtenida", 2500);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              mostrarMensaje(
                "Al parecer no has permitido acceder a la ubicación",
                4000
              );
              break;
            case error.POSITION_UNAVAILABLE:
              mostrarMensaje(
                "La información de ubicación no está disponible",
                4000
              );
              break;
            case error.TIMEOUT:
              mostrarMensaje(
                "Se agotó el tiempo de espera de la solicitud para obtener la ubicación del usuario",
                4000
              );
              break;
            default:
              mostrarMensaje("Un error desconocido ocurrió", 4000);
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      mostrarMensaje("El navegador no admite la geolocalización", 3000);
    }
  };
  return (
    <div className="space-y-5 w-full h-full">
      <div className="w-full h-full relative">
        <div
          onClick={getMap}
          title="Obtener mi ubicaión"
          className="absolute w-[50px] h-[50px] rounded-full bg-white top-2 right-2 z-[2] border-4 border-[#f33a40] flex items-center justify-center"
        >
          <div className="w-[60%] h-[60%] bg-[#f33a40] rounded-full"></div>
        </div>
        <Map
          height={onPc ? 450 : undefined}
          zoomSnap={false}
          twoFingerDrag={false}
          center={
            desdeUsuario && lat && lng
              ? [lat, lng]
              : [position.lat, position.lng]
          }
          defaultZoom={16}
          onBoundsChanged={(all) => {
            onMapDrag(all.center);
          }}
        >
          <ZoomControl
            buttonStyle={{
              margin: "6px",
            }}
          />

          <div className="flex justify-center items-center h-full">
            <Marker
              color="red"
              width={40}
              anchor={
                desdeUsuario && lat && lng
                  ? [lat, lng]
                  : [position.lat, position.lng]
              }
            />
          </div>
        </Map>
      </div>
    </div>
  );
}

export default Mapa;
export function MapPrint({ position }: { position: locale | undefined }) {
  return (
    <Map
      twoFingerDrag //@ts-ignore
      defaultCenter={[position?.lat, position?.lng]}
      defaultZoom={16}
    >
      {/* @ts-ignore */}
      <Marker color="red" width={50} anchor={[position?.lat, position?.lng]} />
    </Map>
  );
}
