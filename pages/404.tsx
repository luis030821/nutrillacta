import BotonBuscar from "@/components/button/BotonBuscar";

import { useData } from "@/context/withContext";
import { withContext } from "@/context/withContext";
import { url } from "@/services/url";
import withPWA from "@/services/withPWA";
import Head from "next/head";
import { useRouter } from "next/router";
function Custom404() {
  const { products, categories } = useData();
  const router = useRouter();
  const currentRoute = router.asPath;
  var nombre = currentRoute.split("/");
  var valorABuscar = nombre[nombre.length - 1].slice(0, 4);
  return (
    <>
      <Head>
        <title>404 No encontrado | Nutrillacta </title>
      </Head>

      <section className="flex items-center h-full p-16 ">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h1 className="mb-8 font-extrabold text-9xl ">
              <span className="sr-only">Error</span>404
            </h1>
            <p className="text-2xl font-semibold md:text-3xl">
              Es posible que este segmento se haya movido a otra parte
            </p>

            <p className="mt-4 mb-4 ">
              Tal vez ¿buscabas alguno de estos productos?
            </p>
            <div className="mb-8">
              <BotonBuscar
                inyectarEnInput={valorABuscar}
                fromNav
                products={products}
                categories={categories}
              />
            </div>
            <a
              rel="noopener noreferrer"
              href="/"
              className="px-8 py-3 font-semibold rounded-full text-white bg-blaze-orange-400 "
            >
              Regresar a inicio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default withContext(Custom404);

export const getStaticProps = async () => {
  withPWA(
    "Spondylus Licorería",
    "https://imagedelivery.net/Z6uUFT3xWbycdRxHWf6QLQ/88d37872-dde9-4ccb-9ec1-aab0cc4c7e00/crop"
  );
  const products = await url("products");
  // const cards = await url("cards");
  const categories = await url("categories");
  const value = {
    products,
    categories,
    // cards,
  };
  return { props: value };
};
