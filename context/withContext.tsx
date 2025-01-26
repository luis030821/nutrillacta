import { useConfirmarCompra } from "@/infraestructure/confirmarCompra/context/ConfirmarCompraProvider";
import { Cards, Category, Product, url, Variant } from "@/services/url";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext({});
export const useData = () => {
  return useContext(context) as {
    products: Product[];
    categories: Category[];
    images: string[];
  };
};
export const withContext = (Component: any) => {
  const r = (
    props: {
      categories: Category[];
      products: Product[];
      images?: string[];
    } & { value: boolean }
  ) => {
    const { setProduct } = useConfirmarCompra();
    useEffect(() => {
      setProduct(props.products);
    }, []);
    // function filterInventoryByProductIds() {
    //   if (inventory != undefined) {
    //     const productsArr: any[] = [];
    //     props.products.forEach((x) => {
    //       x.variants.forEach((e, index) => {
    //         productsArr.push({
    //           ...x,
    //           ...e,
    //           productId: `${x.productId}${index}`,
    //         });
    //       });
    //     });
    //     const r = productsArr.filter((product) =>
    //       inventory?.some((inv) => inv.productId === product.productId)
    //     );
    //     //@ts-ignore
    //     setProducts(r);
    //   }
    // }
    // useEffect(() => {
    //   filterInventoryByProductIds();
    // }, [inventory]);

    return (
      <context.Provider value={{ ...props }}>
        <Component {...props} />
      </context.Provider>
    );
  };
  return r;
};
export type Props<T> = {
  products: Product[];
  categories: Category[];
  cards?: Cards[];
} & T;
export const getStaticProps = async () => {
  const products = await url("products");
  const cards = await url("cards");
  const categories = await url("categories");
  const value = {
    products,
    categories,
    cards,
  };
  return { props: value };
};
