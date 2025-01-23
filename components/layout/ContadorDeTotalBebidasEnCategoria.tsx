import React from "react";
import { Category, Product } from "@/services/url";
import { useData } from "@/context/withContext";
export default function ContadorDeTotalBebidasEnCategoria({categoria}:{categoria?:string}) {
  const { categories, products } = useData();
  return (
    <span className="">
      {products.filter((x:Product) => x.categoryId == categoria).length}
    </span>
  );
}
