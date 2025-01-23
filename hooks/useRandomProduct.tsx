
import { Category, Product } from "@/services/url";
import React, { useEffect, useState } from "react";

function useRandomProduct() {
  const MostrarProductosRandom = ({
    categories,
    products,
    singleProduct,
  }: {
    categories: Category[];
    products: Product[];
    singleProduct: Product;
  }) => {
    const [arr, setArr] = useState<Product[] | undefined>();

    useEffect(() => {
      logic();
    }, []);

    const logic = async () => {
      let arr: Product[] = [];

      const categoriaMaxima = 6;
      const productoMaxima = 2;

      const recomendado =
        singleProduct.recomended?.length > 0
          ? singleProduct.recomended.length - 1
          : 0;

      if (singleProduct.recomended) {
        singleProduct.recomended.forEach((rec) => {
          const productoRecomendado = products.find(
            (e) => e.productId === rec.slice(0, 10)
          );
          if (productoRecomendado) arr.push(productoRecomendado);
        });
      }

      let verificarSiNumeroRandomSeRepiteCategorias: number[] = [];
      for (let i = 0; i < categoriaMaxima; i++) {
        let numRand = Math.floor(Math.random() * categories.length);
        while (verificarSiNumeroRandomSeRepiteCategorias.includes(numRand)) {
          numRand = Math.floor(Math.random() * categories.length);
        }

        const cat = categories[numRand].categoryId;
        let arrProduct: Product[] = [];
        products.forEach((e) => {
          if (cat === e.categoryId) {
            arrProduct.push(e);
          }
        });

        let verificarSiNumeroRandomSeRepiteProductos: number[] = [];
        for (let j = 0; j < productoMaxima; j++) {
          if (arr.length >= categoriaMaxima * productoMaxima - recomendado) {
            break;
          }
          let numRandProduct = Math.floor(Math.random() * arrProduct.length);
          while (verificarSiNumeroRandomSeRepiteProductos.includes(numRandProduct)) {
            numRandProduct = Math.floor(Math.random() * arrProduct.length);
          }
          verificarSiNumeroRandomSeRepiteProductos.push(numRandProduct);
          arr.push(arrProduct[numRandProduct]);
        }
        verificarSiNumeroRandomSeRepiteCategorias.push(numRand);
      }

      setArr(arr);
    };

    return arr;
  };

  

  return { MostrarProductosRandom,};
}

export default useRandomProduct;
