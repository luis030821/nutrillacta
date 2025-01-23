import Head from "next/head";
import React from "react";

export default function HomePageSeo() {
  return (
    <Head>
      <title>Nutrillacta | Ordena ahora</title>
      <link rel="canonical" href="https://www.licoreriaspondylus.com/" />
      <meta
        name="description"
        content={`Ordena ahora tus licores preferidos, contamos con los mejores precios, diferentes categorias: cerveza, whisky, ron, tequila, vodka, y mucho más. Contamos con servicio a domicilio, te lo dejamos en la puerta de tu casa en menos de 30 minutos.`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://licoreriaspondylus.com",
            logo: "https://licoreriaspondylus.com/logo.png",
            name: "Nutrillacta",
            description:
              "Venta de licores con servicio a domicilio, visita los mejores precios en todo Quito. Ordene ahora de manera fácil rápida en nuestra web.",
            email: "licoreriaspondylus@gmail.com",
            telephone: "+593-95-956-3276",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Gonzalo Meneses",
              addressLocality: "Tumbaco, Quito",
              addressCountry: "EC",
              addressRegion: "Quito",
              postalCode: " 170902",
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
