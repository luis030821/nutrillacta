import { Category, Product } from "@/services/url";
import Head from "next/head";
import React from "react";

export default function CategorySeo({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <Head>
      <link
        rel="canonical"
        href={`https://www.licoreriaspondylus.com/menu/${category?.title.toLowerCase()}`}
      />
      <title>
        {category?.title.charAt(0).toUpperCase() +
          category?.title.slice(1).toLowerCase()}{" "}
        | Nutrillacta
      </title>
      <meta
        name="description"
        content={`Conoce la categoría ${category?.title}, y sus ${
          products.filter((x) => x.categoryId == category?.categoryId).length
        } variedades para todo tipo de gustos con precios increíbles. Ordena ahora y te lo llevamos hasta la puerta de casa en menos de 30 minutos.`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Licorería Spondulus",
            url: "https://www.licoreriaspondylus.com",
          }),
        }}
      />
    </Head>
  );
}
