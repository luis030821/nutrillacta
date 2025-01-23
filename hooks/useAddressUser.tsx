import client from "@/client";
import useMessage from "@/context/message/useMessage";
import { Address, User } from "@/interface";
import { createProviderFn } from "@/services/contextFn";
import { useCollection, useUser } from "@llampukaq/realm";
import { useLocalStorage } from "@uidotdev/usehooks";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function useAddUser() {
  const [address, setAddress] = useState<Address[]>([]);
  const { user } = useUser<User>();
  const collection = useCollection("user", "address");
  const { messagePromise } = useMessage();
  const [selectedAddress, setSelectedAddress] = useLocalStorage<
    Address | undefined
  >("address");
  useEffect(() => {
    if (user != undefined) {
      findAddress();
    }
  }, [user]);

  const findAddress = async () => {
    const res = await collection?.find({
      userId: user?.userId,
    });

    if (selectedAddress != undefined) {
      setSelectedAddress(res?.find((x) => x.isMatriz));
    }
    setAddress(res ?? []);
  };

  const manageMatrizStatus = async () => {
    await collection?.findOneAndUpdate(
      {
        userId: user?.userId,
        isMatriz: true,
      },
      { $set: { isMatriz: false, addressId: nanoid(10) } }
    );
  };

  const createAddress = async (data: Address) => {
    messagePromise(
      async () => {
        if (data?.isMatriz) {
          await manageMatrizStatus();
        }
        const dataGeo = await createAddressGeo(data);
        const res = await collection?.insertOne({
          ...dataGeo,
          userId: user?.userId,
        });
        await findAddress();
        return res;
      },
      {
        error: "Error al agregar dirección",
        pending: "Agregando dirección...",
        success: "Dirección agregada",
      }
    );
  };

  const updateAddress = async (id: string, data: Address) => {
    messagePromise(
      async () => {
        if (data?.isMatriz) {
          await manageMatrizStatus();
        }
        const dataGeo = await createAddressGeo(data);
        await collection?.findOneAndUpdate(
          {
            addressId: id,
          },
          {
            $set: dataGeo,
          }
        );
        await findAddress();
      },
      {
        error: "Error al actualizar dirección",
        pending: "Actualizando dirección...",
        success: "Dirección actualizada",
      }
    );
  };

  const deleteAddress = async (id: string) => {
    messagePromise(
      async () => {
        await collection?.findOneAndDelete({ addressId: id });
        await findAddress();
      },
      {
        error: "Error al eliminar dirección",
        pending: "Eliminando dirección...",
        success: "Dirección eliminada",
      }
    );
  };

  return {
    findAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    address,
    selectedAddress,
    setSelectedAddress,
  };
}
const [UserAddressProvider, useUserAddress] =
  createProviderFn<typeof useAddUser>(useAddUser);
export { UserAddressProvider, useUserAddress };
export const createAddressGeo = async (data: any) => {
  const geocoding = `${client.llampukaq}/v1/geo/reverse?lat=${data.map.lat}&lng=${data.map.lng}`;
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
  return { ...data, ...g };
};
