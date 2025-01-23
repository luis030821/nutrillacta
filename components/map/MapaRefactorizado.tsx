import React, { startTransition, useEffect, useState } from "react";
import { useGeolocation } from "@uidotdev/usehooks";

import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import useMensajeSimple from "../mensajes/UseMensajeSimple";
import useMainContext from "@/context/useMainContext";

interface locale {
  lat: number;
  lng: number;
}
export default function MapaRefactorizado({
  onClick,
  lat = -0.21212506698661598,
  lng = -78.40443553650846,
}: {
  onClick: (e: locale) => void;
  lat?: number;
  lng?: number;
}) {
  const { onPc } = useMainContext();

  const [position, setPosition] = useState({
    lat: -0.21212506698661598,
    lng: -78.40443553650846,
  });

  useEffect(() => {
    onClick?.(position);
  }, [position]);

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setPosition({ lat, lng });
    }
  }, [lat, lng]);

  const onMapDrag = (center: [number, number]) => {
    setPosition({
      lat: center[0],
      lng: center[1],
    });
  };

  const { latitude, longitude } = useGeolocation();
  const getMap = () => {
    //@ts-ignore
    setPosition({ lat: latitude, lng: longitude });
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
          height={onPc ? 450 : 400}
          zoomSnap={false}
          twoFingerDrag={false}
          center={[position.lat, position.lng]}
          defaultZoom={16}
          onBoundsChanged={(all) => {
            onMapDrag(all.center);
          }}
        >
          <Overlay anchor={[-0.209325, -78.401643]} offset={[30, 40]}>
            <img src="/logoHorizontal.png" width={260} height={70} alt="" />
          </Overlay>
          <ZoomControl
            buttonStyle={{
              margin: "6px",
            }}
          />
          <div className="flex justify-center items-center h-full">
            <Marker
              color="red"
              width={40}
              anchor={[position.lat, position.lng]}
            />
          </div>
        </Map>
      </div>
    </div>
  );
}
