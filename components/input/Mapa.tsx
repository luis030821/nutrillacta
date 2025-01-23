import React, { useEffect, useState } from "react";
import { useGeolocation } from "@uidotdev/usehooks";

import { Map, Marker, ZoomControl } from "pigeon-maps";

interface locale {
  lat: number;
  lng: number;
}
function Mapa({ onClick }: { onClick: (e: locale) => void }) {
  const [position, setPosition] = useState({ lat: -0.210531, lng: -78.393855 });
  const [positionMarker, setPositionMarker] = useState({
    lat: -0.2118828241577879,
    lng: -78.40463748023997,
  });

  const state = useGeolocation();

  useEffect(() => {
    if (state.error) {
      setPosition({
        lat: -0.2118828241577879,
        lng: -78.40463748023997,
      });
      setPositionMarker({
        lat: -0.2118828241577879,
        lng: -78.40463748023997,
      });
    } else {
      //@ts-ignore
      setPosition({ lat: state.latitude, lng: state.longitude });
      //@ts-ignore
      setPositionMarker({ lat: state.latitude, lng: state.longitude });
    }
    //@ts-ignore
  }, [state]);
  //@ts-ignore

  const onMapDrag = (e) => {
    const newPosition = {
      //@ts-ignore
      lat: e[0],
      //@ts-ignore
      lng: e[1],
    };
    setPosition(newPosition);
    setPositionMarker(newPosition);
  };
  return (
    <div className="space-y-5 w-full h-full">
      <div className="w-full h-full">
        <Map
          zoomSnap={false}
          twoFingerDrag
          defaultCenter={[position.lat, position.lng]}
          defaultZoom={16}
          onBoundsChanged={(all) => {
            onMapDrag(all.center);
          }}
        >
          <ZoomControl />
          <div className="flex justify-center items-center h-full">
            <Marker
              color="red"
              width={50}
              anchor={[positionMarker.lat, positionMarker.lng]}
            />
          </div>
        </Map>
      </div>
      <button
        onClick={() => {
          onClick?.(positionMarker);
        }}
      >
        
      </button>
    </div>
  );
}

export default Mapa;
export function MapPrint({ position }: { position: any }) {
  return (
    <Map
      twoFingerDrag
      defaultCenter={[position.lat, position.lng]}
      defaultZoom={16}
    >
      <Marker color="red" width={50} anchor={[position.lat, position.lng]} />
    </Map>
  );
}
