import client from "@/client";
import { useCart } from "@/context/CartContext";
import { useData } from "@/context/withContext";
import { getGreeting } from "@/infraestructure/cart/funciones";
import { Icons } from "@/icons";

import React, { useEffect, useState } from "react";

export default function SeguirPorWhastapp() {
  const { products } = useData();
  const { shop } = useCart();
  const [productos, setproductos] = useState<any[]>();

  useEffect(() => {
    const mappedProducts = shop.map((shopItem, ind) => {
      const product = products.find(
        (product) => product.productId === shopItem.productId.slice(0, 10)
      );
      return product
        ? `%20%0A${ind + 1}.%20 x` +
            shopItem.count +
            " " +
            product.title +
            " " +
            product.variants[Number(shopItem.productId.slice(10, 11))].name +
            ""
        : "Producto no encontrado";
    });

    setproductos(mappedProducts);
  }, [shop, products]);

  return (
    <div className="w-full flex justify-center mt-2">
      <a
        className="flex justify-center px-5 py-1 gap-2 items-center rounded-[6px] bg-[#199d4a]"
        target="_blank"
        referrerPolicy="no-referrer"
        href={`https://api.whatsapp.com/send?phone=593${Number(
          client.celular
        )}&text=${getGreeting()} me gustaria ordenar: ${productos} `}
      >
        <div className={`flex min-h-[28px] justify-center relative`}>
          <Icons
            className="stroke-white"
            size={40}
            icon={"IconBrandWhatsapp"}
          ></Icons>
        </div>
        <p className="text-base font-bold text-white mx-auto">
          {"Seguir compra por Whastapp"}
        </p>
      </a>
    </div>
  );
}
