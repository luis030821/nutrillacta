import { useOrders } from "@/backend/useOrders";

import { useCart } from "@/context/CartContext";
import { estimateShipingOrderReturn, User } from "@/interface";
import { createProviderFn } from "@/services/contextFn";
import { Product } from "@/services/url";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useUser } from "@llampukaq/realm";
import { useUserAddress } from "@/hooks/useAddressUser";
import useInvoice from "./hooks/useInvoice";
const useU = () => {
  const [loading, setLoading] = useState(false);
  const methodPayments = {
    tranfer: "tranfer",
    card: "card",
    paypal: "paypal",
    cash: "cash",
  };
  const { createInvoice } = useInvoice();
  const [order, setOrder] = useLocalStorage<
    estimateShipingOrderReturn | undefined
  >("orderInfo1");
  const [fee60, setFee60] = useLocalStorage<number | undefined>("fee60", 0);
  const [fee40, setFee40] = useLocalStorage<number | undefined>("fee40", 0);
  const [addressId, setAddressId] = useLocalStorage<
    "PICKUP" | string | undefined
  >("addressId");
  const [errorFromPedidosYa, seterrorFromPedidosYa] = useState(false);
  const [totalPriceDelivery, settotalPriceDelivery] = useLocalStorage<number>(
    "totalPriceDelivery",
    0
  );
  const [methodPayment, setMethodPayment] = useLocalStorage<
    "tranfer" | "card" | "paypal" | "cash" | undefined
  >("payment");
  const fee = () => {
    try {
      if (addressId == "PICKUP") {
        setFee40(0);
        setFee60(0);
      }
      const priceFee =
        (order?.deliveryOffers[0]?.pricing.total as number) == undefined
          ? 0
          : (order?.deliveryOffers[0].pricing.total as number);

      const fee6 = (priceFee * 50) / 100;
      setFee60(fee6);
      settotalPriceDelivery(priceFee);
      if (addressId != "PICKUP") {
        const fee4 = (priceFee * 50) / 100 + 0.3;
        setFee40(fee4);
        return;
      }
      if (
        (methodPayment == "paypal" || methodPayment == "card") &&
        addressId == "PICKUP"
      ) {
        setFee40(0.3);
        return;
      }
      if (methodPayment == "cash" || methodPayment == "tranfer") {
        const fee4 = (priceFee * 50) / 100;
        setFee40(fee4);
      }
      seterrorFromPedidosYa(false);
    } catch (error) {
      //@ts-ignore
      setOrder(undefined);
      setFee40(0);
      setFee60(0);
      seterrorFromPedidosYa(true);
    }
  };
  const { shop, setShop } = useCart();
  const { address } = useUserAddress();
  const { user } = useUser<User>();
  const router = useRouter();
  const [products, setProduct] = useState<Product[]>();
  const all = shop
    ?.map((e) => {
      const count = Number(e.count);
      const index = parseFloat(e.productId.charAt(e.productId.length - 1));
      const product = products?.find(
        (x: Product) =>
          x.productId == e.productId.substring(0, e.productId.length - 1)
      );
      const priceVariant = Number(product?.variants?.[index].price);
      return priceVariant * count;
    })
    .reduce((a, b) => a + b, 0);

  const { createOrder } = useOrders();
  const reset = () => {
    setMethodPayment(undefined);
    setOrder(undefined);
    setFee60(undefined);
    setFee40(undefined);
    setAddressId(undefined);
  };

  const onCreate = async (
    data?:
      | {
          payment: "cash" | "card" | "paypal";
          authorizationCode?: undefined;
          cardType?: undefined;
          cardBrand?: undefined;
        }
      | {
          payment: "cash" | "card" | "paypal";
          authorizationCode: any;
          cardType: any;
          cardBrand: any;
        },
    product?: any
  ) => {
    const productsa = (product ?? products) as Product[];
    const methodPayment =
      data?.payment == "cash"
        ? {
            payment: data?.payment,
          }
        : {
            payment: data?.payment,
            authorizationCode: data?.authorizationCode,
            cardType: data?.cardType,
            cardBrand: data?.cardBrand,
          };
    const fee = Number(fee40?.toFixed(2)) + Number(fee60?.toFixed(2));
    const price = (fee + all).toFixed(2);
    if (addressId == "PICKUP") {
      await createOrder(shop, addressId, price, {
        ...data,
        fee60: fee60,
        fee40: fee40,
      });
    }
    if (addressId != "PICKUP") {
      await createOrder(shop, addressId, price, {
        ...data,
        fee60: fee60,
        fee40: fee40,
        estimateId: order?.estimateId,
        referenceId: order?.referenceId,
        distance: order?.route?.distance,
        deliveryOfferId: order?.deliveryOffers[0].deliveryOfferId,
      });
    }

    await createInvoice({
      priceAll: Number(price),
      client:
        user?.email == undefined
          ? {
              cliente: user?.name ?? "Default",
              telefono: user?.phone ?? "Default",
              email: user?.email,
              direccion:
                address.find((x) => x.addressId == addressId)?.formatted ??
                "Tumbaco",
              addressId,
            }
          : "Final",
      methodPayment,

      invoice: [
        ...shop.map((x) => {
          const count = x.count;
          const index = parseFloat(x.productId.charAt(x.productId.length - 1));
          const id = x.productId.substring(0, x.productId.length - 1);
          const product = productsa?.find((x: Product) => x.productId == id);
          return {
            id: x.productId,
            count,
            priceUnit: Number(product?.variants[index].price),
          };
        }),
        addressId != "PICKUP" && {
          id: "shipping",
          count: 1,
          priceUnit: Number(fee),
        },
      ],
    });
    reset();
    router.push("/mispedidos");
    await fetch(
      "https://us-east-1.aws.data.mongodb-api.com/app/backend-llk-nlhkq/endpoint/telegramOrder"
    );
    setShop([]);
  };

  const onSuccessOrderCreate = async (data?: object, products?: any) => {
    if (methodPayment == "cash") {
      await onCreate({ payment: methodPayment, ...data }, products);
      setLoading(false);
      return;
    }
    if (methodPayment == "card") {
      await onCreate({ payment: methodPayment, ...data }, products);
      setLoading(false);
      return;
    }
    if (methodPayment == "paypal") {
      await onCreate({ payment: methodPayment, ...data }, products);
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    addressId != undefined && fee();
    addressId == undefined && setMethodPayment(undefined);
  }, [order, addressId]);
  useEffect(() => {
    addressId == undefined && setMethodPayment(undefined);
  }, []);

  return {
    price: Number(fee60) + all + Number(fee40),
    methodPayments,
    loading,
    methodPayment,
    setLoading,
    order,
    setOrder,
    addressId,
    setAddressId,
    fee60,
    fee40,
    setMethodPayment,
    totalPriceDelivery,
    errorFromPedidosYa,
    onSuccessOrderCreate,
    cartPriceAll: all,
    setProduct,
  };
};
const [ConfirmarCompraProvider, useConfirmarCompra] =
  createProviderFn<typeof useU>(useU);
export { ConfirmarCompraProvider, useConfirmarCompra };
