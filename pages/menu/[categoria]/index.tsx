import { BotonAgregarAlCarro } from "@/components/button/BotonAgregarAlCarro";
import ContadorDeTotalBebidasEnCategoria from "@/components/layout/ContadorDeTotalBebidasEnCategoria";

import TarjetaProductoVertical from "@/components/layout/TarjetaProductoVertical";
import { useData, withContext } from "@/context/withContext";
import CategorySeo from "@/seo/CategorySeo";
import { Category, Product, format, url } from "@/services/url";
import { GetStaticPaths, GetStaticPropsContext } from "next";
export const getStaticPaths: GetStaticPaths = async () => {
  const categorias = (await url("categories")) as Category[];
  const paths = categorias.map((categoria) => ({
    params: { categoria: format(categoria.title) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  //@ts-ignore
  const productId = context.params.categoria;
  const products = (await url("products")) as Product[];
  const cards = await url("cards");
  const categories = (await url("categories")) as Category[];
  const category = categories.find((x) => format(x.title) == productId);
  const value = {
    category,
    products,
    categories,
    cards,
  };
  return { props: value };
};

const CategoriaPage = ({ category }: { category: Category }) => {
  const { categories, products } = useData();
  const shuffledCategories = categories.sort(() => Math.random() - 0.5);
  return (
    <>
      <CategorySeo category={category} products={products} />
      <div className="relative max-w-[1200px] mx-auto">
        <div className="flex flex-col p-2 items-center relative  ">
          <div className="w-full flex gap-2 items-center ">
            <h1 className="text-[1.3rem] font-bold capitalize text-center w-full ">
              {category?.title}
            </h1>
          </div>
        </div>
        <div className=" grid grid-cols-2 lg:grid-cols-3  gap-2 px-4">
          {products
            .filter((e) => e.categoryId === category?.categoryId)
            .map((product) => {
              return (
                <>
                  {product.variants.map((variant, index) => (
                    <TarjetaProductoVertical
                      index={index}
                      key={index}
                      product={{ ...product, ...variant }}
                      usarSoloTarjeta
                      usarSoloTarjetaProducto={{
                        ...product,
                        ...variant,
                      }}
                    />
                  ))}
                </>
              );
            })}
        </div>
        <h1 className="text-[1.2rem] font-bold pl-3 pt-4">
          <span>Explora más categorias:</span>
        </h1>

        <div className="p-3">
          {shuffledCategories.map((data, index) => (
            <div className="flex flex-col justify-center overflow-auto">
              <h2 className="capitalize">
                {data?.title} (
                <ContadorDeTotalBebidasEnCategoria
                  categoria={data?.categoryId}
                />
                )
              </h2>
              <div
                className={`h-max gap-2  grid grid-cols-2 lg:grid-cols-3 py-2 `}
              >
                {products
                  .filter((e) => e.categoryId === data?.categoryId)
                  .map((product) => {
                    return (
                      <>
                        {product.variants.map((variant, index) => (
                          <TarjetaProductoVertical
                            index={index}
                            key={index}
                            product={{ ...product, ...variant }}
                            usarSoloTarjeta
                            usarSoloTarjetaProducto={{
                              ...product,
                              ...variant,
                            }}
                          />
                        ))}
                      </>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* <div
          onClick={router.back}
          className="border flex gap-2 items-center fixed  bottom-[96px] right-4 z-[1]  shadow-lg bg-paleta-300 px-4 py-3 rounded-[9px] "
        >
          <Icons
            className="fill-none -rotate-[180deg] stroke-paleta-100"
            icon="left"
          ></Icons>
          <h1 className="font-bold text-[.9rem] capitalize text-paleta-100 pr-3">
            Volver
          </h1>
        </div> */}
      </div>
    </>
  );
};

export default withContext(CategoriaPage);
