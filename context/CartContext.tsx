import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useContext, useEffect, useState } from "react";
const cartContext = createContext({});
export interface Shop {
  productId: string;
  count: number;
}
function CartContext({ children }: any) {
  const [shop, setShop] = useLocalStorage<Shop[]>("shop", []);

  const addCart = (id: string | undefined, count: number = 1) => {
    const exist = shop?.find((x) => x.productId == id);
    if (exist) {
      if (exist.count) {
        const r = shop?.map((x) =>
          x.productId == id ? { ...x, count: x.count + count } : x
        );
        setShop(r);
      }
      if (!exist.count) {
        const r = shop?.map((x) => (x.productId == id ? { ...x, count } : x));
        setShop(r);
      }
    }
    if (!exist) {
      //@ts-ignore
      const r = [...shop, { productId: id, count }];
      //@ts-ignore
      setShop(r);
    }
  };

  const removeCartItem = (id: string | undefined, count: number = 1) => {
    const updatedCart = shop
      ?.map((item) => {
        if (item.productId === id) {
          if (item.count && item.count > 1) {
            const res = item.count - count;
            if (res == 0) {
              return null;
            }
            if (res != 0) {
              return { ...item, count: item.count - count };
            }
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);
    //@ts-ignore
    setShop(updatedCart);
  };
  const shopRoute = `?products=${JSON.stringify(shop)}`;
  const readShopRoute = (string: any) => {
    const products = JSON.parse(string);
    setShop(products);
  };
  return (
    <cartContext.Provider
      value={{
        readShopRoute,
        addCart,
        shop,
        removeCart: removeCartItem,
        shopRoute,
        setShop,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContext;
export const useCart = () => {
  return useContext(cartContext) as {
    addCart: (id: string | undefined, count?: number) => void;
    shop: Shop[];
    removeCart: (id: string | undefined) => void;
    shopRoute: string | undefined;
    readShopRoute: any;
    setShop?: any;
  };
};
