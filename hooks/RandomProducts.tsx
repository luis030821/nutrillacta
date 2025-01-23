import { Category, Product, Variant } from "@/services/url";
import { useEffect, useState } from "react";
export interface generalProduct {
  producto: Product;
  variante: Variant;
}
export const listadoProductos = (
  categories: Category[],
  products: Product[],
  singleProduct: Product & Variant,
  indexVariant: number,
  onPc: boolean
) => {
  var arrMain: generalProduct[] = [];

  const logic = async () => {
    let arr: generalProduct[] = [];
    // categora maxima define cuantas categorias se van a imprimir
    const categoriaMaxima = 10;
    // productoMaxima define cuantos productos por cada categoria deben imprimirse
    const productoMaxima = 2;

    const recomendado =
      singleProduct.recomended?.length > 0
        ? singleProduct.recomended.length - 1
        : 0;

    //poner variantes como recomendados
    if (singleProduct.variants.length >= 1) {
      var arrVariants = singleProduct.variants.filter(
        (e) => e.name != singleProduct.name
      );
      for (
        let indexVariant = 0;
        indexVariant < arrVariants.length;
        indexVariant++
      ) {
        arr.push({
          producto: singleProduct,
          variante: arrVariants[indexVariant],
        });
        // const element = singleProduct.variants[indexVariant];
      }
    }

    // agregar productos recomendados en caso de que un producto los tenga
    if (singleProduct.recomended) {
      singleProduct.recomended.forEach((rec) => {
        const productoRecomendado = products.find(
          (e) => e.productId === rec.slice(0, 10)
        );
        if (productoRecomendado)
          arr.push({
            producto: productoRecomendado,
            variante: productoRecomendado.variants[0],
          });
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
        while (
          verificarSiNumeroRandomSeRepiteProductos.includes(numRandProduct)
        ) {
          numRandProduct = Math.floor(Math.random() * arrProduct.length);
        }
        verificarSiNumeroRandomSeRepiteProductos.push(numRandProduct);
        arr.push({
          producto: arrProduct[numRandProduct],
          variante: arrProduct[numRandProduct].variants[0],
        });
      }
      verificarSiNumeroRandomSeRepiteCategorias.push(numRand);
    }

    arrMain = arr;
  };
  logic();
  return arrMain;
};
