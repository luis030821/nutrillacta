import useMessage from "@/context/message/useMessage";
import { User } from "@/interface";
import {
  Credentials,
  useApp,
  useAuth,
  useCollection,
  useUser,
} from "@llampukaq/realm";
import { nanoid } from "nanoid";
function useAddress() {
  const collection = useCollection("user", "address");
  const { messagePromise } = useMessage();
  const { user } = useUser<User>();
  const app = useApp();
  const { createUserData } = useAuth();
  const createAddressAnonymous = async (email: string, data: any) => {
    if (data.coordenadas != undefined) {
      const save = { ...data };
      const credentials = Credentials.anonymous();
      const userRealm = await app.logIn(credentials);
      const collection = userRealm
        .mongoClient("mongodb-atlas")
        .db("user")
        .collection("users");
      const exist = await collection.findOne(
        { email },
        { projection: { _id: false, email: true } }
      );
      if (exist == undefined) {
        await userRealm.functions.userUsers(
          "create",
          email,
          createUserData({
            email,
            name: data.who,
            address: [save],
          })
        );
      }
      if (exist != undefined) {
        await collection.findOneAndUpdate(
          { email },
          {
            $push: { address: save },
          }
        );
      }
    }
    if (data.coordenadas == undefined) {
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
      const save = { ...data, ...g };
      const credentials = Credentials.anonymous();
      const userRealm = await app.logIn(credentials);
      const collection = userRealm
        .mongoClient("mongodb-atlas")
        .db("user")
        .collection("users");
      const exist = await collection.findOne(
        { email },
        { projection: { _id: false, email: true } }
      );
      if (exist == undefined) {
        await userRealm.functions.userUsers(
          "create",
          email,
          createUserData({
            email,
            name: data.who,
            address: [save],
          })
        );
      }
      if (exist != undefined) {
        await collection.findOneAndUpdate(
          { email },
          {
            $push: { address: save },
          }
        );
      }
    }
  };
  const createAddress = async (dat: any) => {
    const data = { ...dat, userId: user?.userId, addressId: nanoid(10) };
    if (data.coordenadas != undefined) {
      await collection?.insertOne(data);
    }
    if (data.coordenadas == undefined) {
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
      const save = { ...data, ...g };
      await collection?.insertOne(save);
    }
  };
  const updateAddress = (addressId: string | undefined, data: any) => {
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          { userId: user?.userId, addressId },
          {
            $set: data,
          }
        );
      },
      {
        error: "Error al actualizar",
        pending: "Actualizando la dirección...",
        success: "Dirección actualizada correctamente.",
      }
    );
  };
  const deleteAddress = async (addressId: string) => {
    messagePromise(
      async () => {
        await collection?.findOneAndDelete({ addressId });
      },
      {
        error: "Ha ocurrido un error al eliminar la dirección.",
        pending: "Eliminando la dirección...",
        success: "Dirección eliminada correctamente.",
      }
    );
  };
  return {
    createAddress,
    updateAddress,
    deleteAddress,
    createAddressAnonymous,
  };
}
export default useAddress;
export const fr = {
  results: [
    {
      datasource: {
        sourcename: "openstreetmap",
        attribution: "© OpenStreetMap contributors",
        license: "Open Database License",
        url: "https://www.openstreetmap.org/copyright",
      },
      name: "De las Golondrinas",
      country: "Ecuador",
      country_code: "ec",
      state: "Pichincha",
      county: "Quito Canton",
      city: "Tumbaco",
      postcode: "170181",
      suburb: "Leopold Chavez",
      street: "De las Golondrinas",
      lon: -78.4015272,
      lat: -0.2301869,
      state_code: "P",
      distance: 13.842578508815576,
      result_type: "street",
      formatted: "De las Golondrinas, 170181, Tumbaco, Ecuador",
      address_line1: "De las Golondrinas",
      address_line2: "170181, Tumbaco, Ecuador",
      timezone: {
        name: "America/Guayaquil",
        offset_STD: "-05:00",
        offset_STD_seconds: -18000,
        offset_DST: "-05:00",
        offset_DST_seconds: -18000,
      },
      plus_code: "67F3QH9X+W9",
      rank: {
        importance: 0.10000999999999993,
        popularity: 5.1786858475982225,
      },
      place_id:
        "51161d249fb29953c0590ddbbbabc376cdbff00102f901b961fd0800000000c002049203124465206c617320476f6c6f6e6472696e6173",
      bbox: {
        lon1: -78.40374,
        lat1: -0.2314461,
        lon2: -78.3992493,
        lat2: -0.2275996,
      },
    },
  ],
  query: {
    lat: -0.22899415914622523,
    lon: -78.40014934968099,
    plus_code: "67F3QHCX+CW",
  },
};
