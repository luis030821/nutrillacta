import client from "@/client";
import useSSE from "@/hooks/useSSE";
import { order, User } from "@/interface";
import { createProviderFn } from "@/services/contextFn";
import { useIsLogin, useUser } from "@llampukaq/realm";
import { useLocalStorage } from "@uidotdev/usehooks";
import { nanoid } from "nanoid";
import { useEffect } from "react";

function useOds() {
  const [orders, setOrders] = useLocalStorage<order[]>("orders");
  const [ordersFinally, setOrderFinally] =
    useLocalStorage<order[]>("ordersFinally");
  const { user } = useUser<User>();
  const createOrder = async (
    shop: any,
    addressId: string | undefined,
    price: number | string,
    opt?: object | undefined
  ) => {
    const data = {
      organizationId: "dge90qe2iqbaxcu",
      shop,
      show: true,
      created: new Date(),
      status: "0",
      to: { userId: user?.userId, addressId },
      orderId: nanoid(11),
      price,
      ...opt,
    };
    const res = await fetch(`${client.llampukaq}/v1/orders`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const formatted = await res.json();
    const newArr = [...(orders ?? []), { ...formatted }];
    setOrders(newArr);
  };
  const [res] = useSSE<order>(
    `${client.llampukaq}/v1/orders/sync`,
    "order",
    {},
    orders != undefined
  );

  useEffect(() => {
    if (res?.to.userId == user?.userId) {
      if (res?.status != "100") {
        const newArr = orders?.map((order) => {
          return order.orderId == res?.orderId ? res : order;
        });
        //@ts-ignore
        setOrders(newArr);
      }
      if (res?.status == "100") {
        const newArr = orders?.filter((order) => order.orderId != res?.orderId);
        findOrdersFinally();
        //@ts-ignore
        if (newArr.length == 0) {
          //@ts-ignore
          setOrders(undefined);
          return;
        } else {
          setOrders(newArr);
        }
      }
    }
  }, [res]);
  useEffect(() => {
    ordersFinally == undefined && findOrdersFinally();
  }, []);
  const findOrdersFinally = async () => {
    const res = await fetch(
      `${client.llampukaq}/v1/orders/${user?.userId}/end`
    );
    setOrderFinally(await res.json());
  };
  return { orders, createOrder, findOrdersFinally, ordersFinally };
}
const [OrdersProvider, useOrders] = createProviderFn<typeof useOds>(useOds);
export { OrdersProvider, useOrders };
