import useMainContext from "@/context/useMainContext";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const { onPc } = useMainContext();

  // useEffect(() => {
  //   const handleStartLoading = () => {
  //     setIsLoading(true);
  //   };

  //   const handleFinishLoading = () => {
  //     setIsLoading(false);
  //   };

  //   // Agregar listeners para los eventos de inicio y fin de carga
  //   document.addEventListener("DOMContentLoaded", handleStartLoading);
  //   window.addEventListener("load", handleFinishLoading);

  //   // Remover los listeners cuando el componente se desmonte
  //   return () => {
  //     document.removeEventListener("DOMContentLoaded", handleStartLoading);
  //     window.removeEventListener("load", handleFinishLoading);
  //   };
  // }, []);

  return (
    <Html lang="es">
      <Head>
        {/* <title>Nutrillacta | Ordena ahora</title>
        <meta
          name="description"
          content={`Ordena ahora tus licores preferidos, contamos con los mejores precios, diferentes categorias: cerveza, whisky, ron, tequila, vodka, y mucho más. Contamos con servicio a domicilio, te lo dejamos en la puerta de tu casa en menos de 30 minutos.`}
        />
        <link rel="canonical" href="https://www.licoreriaspondylus.com/" /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css"
        />
        {/* <meta
          name="google-site-verification"
          content="-4p_X4izqQYNGjc-GcAEPK4r9T5seywc7SQcCpTreOo"
        /> */}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0  user-scalable=no"
        />
        <link rel="preconnect" href="https://wsrv.nl/" />
        <link rel="icon" href="/icons/logo32.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Nutrillacta",
              url: "https://www.licoreriaspondylus.com/",
            }),
          }}
        />
      </Head>
      <body className=" bg-white lg:min-w-screen ">
        <div
          className={`"select-none ${
            onPc ? "max-w-full" : "max-w-[510px] lg:max-w-full"
          } w-full mx-auto "`}
        >
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
