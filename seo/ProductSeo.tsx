import { Product, Variant } from "@/services/url";
import Head from "next/head";
import React from "react";
import { format } from "@/services/url";
import { useRouter } from "next/router";

export default function ProductSeo({
  singleProduct,
  variant,
  categoriaALaQuePerteneceElProducto,
}: {
  singleProduct: Product;
  variant: any;
  categoriaALaQuePerteneceElProducto?: string;
}) {
  const router = useRouter();
  const NAME = " Nutrillacta";
  const shareLink = `https://licoreriaspondylus.com${router.asPath}`;

  return (
    <Head>
      <title>
        {singleProduct?.title} {variant?.name} | {NAME}
      </title>
      <meta
        name="description"
        content={`Adquiere: ${singleProduct?.title} ${variant?.name}, con un valor de: ${variant?.price}. Pidelo ahora a domicilio`}
      />
      <link
        rel="canonical"
        href={`https://www.licoreriaspondylus.com/menu/${categoriaALaQuePerteneceElProducto}/${format(
          singleProduct.title
        )}`}
      />
      <meta property="og:image" content={variant?.img?.src} />
      <meta
        property="og:title"
        content={`${singleProduct?.title} ${variant?.name}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "Product",
            name: `${singleProduct?.title} ${variant?.name}`,
            description: `Adquiere: ${singleProduct?.title} ${variant?.name}, con un valor de: ${variant?.price}.`,
            image: variant?.img?.src,
            url: shareLink,
            brand: {
              "@type": "Brand",
              name: "Nutrillacta",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              priceValidUntil: "2025-12-31",
              price: variant?.price,
              availability: "http://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: "78",
            },
          }),
        }}
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
