import { estimated } from "@/backend/pedidosInfo";
import usePedidosYa from "@/backend/usePedidosYa";
import { PropLugarEstimado } from "@/components/modal/ModalPrecioEnvioEstimado";
import { modal, useModal } from "@/components/modal/OldModal";
import useAddress from "@/hooks/useAddress";
import { useUserAddress } from "@/hooks/useAddressUser";
import { estimateShipingOrderReturn, User } from "@/interface";
import { useLocalStorage } from "@uidotdev/usehooks";
import { nanoid } from "nanoid";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
//@ts-ignore
const addressContext = createContext();
interface Tiempo {
  distancia: string;
  tiempoEstimado: string;
  minutos: number;
}

const localidadesPredefinidas: PropLugarEstimado[] = [
  {
    formated1: "Tumbaco",
    price: "$1.05 ~ $2.50",
    coordenadas: [-0.21212, -78.40443],
    default: true,
  },
  {
    formated1: "Cumbayá",
    price: "$1.80 ~ $3.60",
    coordenadas: [-0.20106, -78.42946],
    default: true,
  },
  {
    formated1: "Puembo",
    price: "$3.05 ~ $4.65",
    coordenadas: [-0.17691, -78.3585],
    default: true,
  },
  {
    formated1: "Pifo",
    price: "$3.00 ~ $5.80",
    coordenadas: [-0.22586, -78.33876],
    default: true,
  },
];
interface interfaceUseAddressInfo {
  setAddressInfo: React.Dispatch<React.SetStateAction<never[]>>;
  getAddressInfo: (data: {
    map: {
      lat: string;
      lng: string;
    };
    saveInfo: boolean;
  }) => boolean;
  addressInfo: any[];
  order: estimateShipingOrderReturn | undefined;
  setOrder: React.Dispatch<
    React.SetStateAction<estimateShipingOrderReturn | undefined>
  >;
  estimacionInfo: PropLugarEstimado | undefined;
  setEstimacionInfo: React.Dispatch<React.SetStateAction<never[]>>;
  getLocationInLocalStorage: (
    lugar?: PropLugarEstimado | undefined
  ) => PropLugarEstimado;
  localidadesPredefinidas: PropLugarEstimado[];
  updateLocation: (data: PropLugarEstimado) => void;
  reset: () => void;
  selectedLocalidad: PropLugarEstimado;
  refresh: boolean;
  convertirMetrosAKilometrosConTiempo: (data: number) => Tiempo;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  modalMap: modal;
  setactualizarLuegoDeEliminar: React.Dispatch<React.SetStateAction<boolean>>;
  addressId: string;
  setAddressId: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const useAddressInfo = () => {
  return useContext(addressContext) as interfaceUseAddressInfo;
};
function AddressProvider({ children }: { children: ReactNode }) {
  const [addressInfo, setAddressInfo] = useLocalStorage<any[]>(
    "lugaresDelUsuario",
    []
  );
  const [selectedLocalidad, setSelectedLocalidad] = useLocalStorage<any>(
    "lugarSeleccionado",
    localidadesPredefinidas[0]
  );
  const [addressId, setAddressId] = useState<string | undefined>();
  const { estimateShipingOrder } = usePedidosYa();
  const [order, setOrder] = useState<estimateShipingOrderReturn>();
  const [estimacionInfo, setEstimacionInfo] = useState<PropLugarEstimado>();

  const [actualizarLuegoDeEliminar, setactualizarLuegoDeEliminar] =
    useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const modalMap = useModal();
  useEffect(() => {
    getLocationInLocalStorage();
  }, [actualizarLuegoDeEliminar]);
  const getAddressInfo = async (data: {
    map: { lat: string; lng: string };
    saveInfo: boolean;
  }) => {
    const geocoding = `https://api.geoapify.com/v1/geocode/reverse?lat=${data.map.lat}&lon=${data.map.lng}&format=json&apiKey=760e09eb6c6145abacba68e479c18ee1`;
    //@ts-ignore
    const res: typeof fr = await (await fetch(geocoding)).json();
    const {
      datasource,
      lon,
      lat,
      distance,
      name,
      timezone,
      bbox,
      result_type,
      ...g
    } = res.results[0];
    const save = { ...data, ...g, addressId: nanoid() };

    try {
      const re = await estimateShipingOrder(
        estimated(
          "garridomateo74@gmail.com",
          {
            latitude: data.map.lat,
            longitude: data.map.lng,
            addressStreet: `${res?.results[0].address_line1}`,
            addressAdditional: "Prueba",
            city: res?.results[0].county,
            phone: " +593962716235",
            name: "Jorge",
          },
          [
            {
              value: 12.2,
              description: "Bebida",
              sku: 1278312,
              quantity: 3,
              volume: 2000,
              weight: 1,
            },
          ]
        )
      );
      setOrder(re);
      setEstimacionInfo({
        formated1: `${g.address_line1} ${g.postcode}, ${g.city}`,
        // const fee6 = (priceAll * 60) / 100;
        price: roundToNearestFiveOrZero(
          parseFloat(
            Number((re?.deliveryOffers[0].pricing.total * 60) / 100).toFixed(2)
          )
        ).toFixed(2),
        //@ts-ignore
        coordenadas: [data.map.lat, data.map.lng],
        route: { distance: re?.route?.distance },
      });

      if (data.saveInfo) {
        setOrder(undefined);
        var newLocaltion = {
          ...save,
          //@ts-ignore
          formated1: `${g.city}, ${g.address_line1} ${g.postcode} `,
          price: roundToNearestFiveOrZero(
            parseFloat(
              Number((re?.deliveryOffers[0].pricing.total * 60) / 100).toFixed(
                2
              )
            )
          ).toFixed(2),

          coordenadas: [data.map.lat, data.map.lng],
          route: { distance: re?.route?.distance },
        };
        var info: any[] = [
          //@ts-ignore
          ...addressInfo,
          newLocaltion,
        ];
        //@ts-ignore
        setAddressInfo(info);
        setSelectedLocalidad(newLocaltion);
        setEstimacionInfo(undefined);
      }

      return true;
    } catch (error) {
      return false;
    }
  };
  const getLocationInLocalStorage = (data?: PropLugarEstimado) => {
    if (data) {
      setSelectedLocalidad(data);
    }
    if (addressInfo.length < 1) {
      setSelectedLocalidad(localidadesPredefinidas[0]);
      return true;
    }
    setSelectedLocalidad(addressInfo[addressInfo.length - 1]);
    return true;
  };

  const reset = () => {
    setEstimacionInfo(undefined);
  };

  function convertirMetrosAKilometrosConTiempo(metros: number): Tiempo {
    const kilometros = (metros / 1000).toFixed(2);

    const metrosPorMinuto = 175;
    const tiempoEstimadoEnMinutos = (metros / metrosPorMinuto).toFixed(0);

    return {
      distancia: `${kilometros}km`,
      tiempoEstimado: `${tiempoEstimadoEnMinutos} minutos`,
      minutos: Number(tiempoEstimadoEnMinutos),
    };
  }

  const updateLocation = (data?: PropLugarEstimado) => {
    setSelectedLocalidad(data);
  };

  const re = {
    setAddressInfo,
    getAddressInfo,
    addressInfo,
    order,
    setOrder,
    estimacionInfo,
    setEstimacionInfo,
    reset,
    getLocationInLocalStorage,
    localidadesPredefinidas,
    updateLocation,
    selectedLocalidad,
    convertirMetrosAKilometrosConTiempo,
    showDropdown,
    modalMap,
    setShowDropdown,
    setactualizarLuegoDeEliminar,
    addressId,
    setAddressId,
  };
  function roundToNearestFiveOrZero(value: number): number {
    // Multiplica por 100 para tratar los decimales como enteros
    let scaledValue = Math.round(value * 100);

    // Extrae el último dígito
    let lastDigit = scaledValue % 10;

    // Ajusta el último dígito al 0 o 5 más cercano
    if (lastDigit < 5) {
      lastDigit = 5;
    } else {
      lastDigit = 0;
      scaledValue += 10; // Incrementa en 10 si redondeamos hacia arriba
    }

    // Ajusta el número escalado con el último dígito redondeado
    scaledValue = scaledValue - (scaledValue % 10) + lastDigit;

    // Divide por 100 para volver a la escala original de decimales
    return scaledValue / 100;
  }
  return (
    <addressContext.Provider value={re}>{children}</addressContext.Provider>
  );
}

export default AddressProvider;
