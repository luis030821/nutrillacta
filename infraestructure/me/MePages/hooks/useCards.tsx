import { useCollection, useUser } from "@llampukaq/realm";
import { useEffect, useState } from "react";
import { cards } from "../Cards";
import { User } from "@/interface";
import { encryptData } from "@/services/cryto";
import { nanoid } from "nanoid";
import useMessage from "@/context/message/useMessage";
function removeSpaces(str: string): string {
  return str.replace(/\s/g, "");
}
function getLastFourDigits(str: string): string {
  return str.slice(-4);
}
function getFourDigits(str: string): string {
  return str.slice(0, 4);
}
function useCards() {
  const { messagePromise } = useMessage();
  const collection = useCollection("user", "cards");
  const findOne = async (cardId: string) => {
    return (await collection?.findOne({ cardId })) as cards;
  };
  const [cards, setCards] = useState<cards[]>();
  const { user } = useUser<User>();
  const find = async () => {
    const res = await collection?.find(
      { userId: user?.userId },
      { projection: { _id: false, card: false, userId: false } }
    );
    setCards(res);
  };
  const save = async (
    numberCard: any,
    expirationDate: any,
    cvv: string,
    name: string
  ) => {
    const res = encryptData(
      JSON.stringify({
        numberCard: removeSpaces(numberCard),
        expirationDate: removeSpaces(expirationDate),
        cvv,
      }),
      `${getFourDigits(numberCard)}${new Date(
        //@ts-ignore
        user?.created
      ).toISOString()}${getLastFourDigits(numberCard)}`
    );
    const data = {
      last: getLastFourDigits(numberCard),
      main: getFourDigits(numberCard),
      userId: user?.userId,
      cardId: nanoid(10),
      card: res,
      name,
    };
    messagePromise(
      async () => {
        await collection?.insertOne(data);
        await find();
      },
      {
        error: "Eror al guardar tarjeta",
        pending: "Encriptando y guardando tarjeta",
        success: "Tarjeta guardada con exito",
      }
    );
  };
  useEffect(() => {
    find();
  }, []);
  const deleteCard = async (cardId: string) => {
    await collection?.findOneAndDelete({ cardId });
    find();
  };
  return { cards, findOne, save, deleteCard, find };
}

export default useCards;
