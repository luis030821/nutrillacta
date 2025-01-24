import { Props, withContext } from "@/context/withContext";
import { Category, Product, Variant, url } from "@/services/url";
import { GetStaticPropsContext } from "next";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { format } from "@/services/url";
import Icons from "@/styles/Icons";
import { Icons as I } from "@/icons";
import Img from "@/components/img/Img";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ImageZoom from "@/components/img/ImageZoom";

import { BotonAgregarAlCarro } from "@/components/button/BotonAgregarAlCarro";
import useMainContext from "@/context/useMainContext";
import P from "@/components/html/P";
import useMensajeSimple from "@/components/mensajes/UseMensajeSimple";
import TarjetaProductoVertical from "@/components/layout/TarjetaProductoVertical";
import { generalProduct, listadoProductos } from "@/hooks/RandomProducts";
import CuadradoDePrecioPc from "@/components/layout/product/CuadradoDePrecioPc";

import ProductSeo from "@/seo/ProductSeo";
function Index({
  singleProduct,
  categories,
  products,
}: Props<{
  singleProduct: Product & Variant;
  products: Product[];
  categories: Category[];
}>) {
  const mostrarMensaje = useMensajeSimple();
  const containerRef = useRef<HTMLDivElement>(null);
  const { onPc } = useMainContext();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant & { index: number }>();
  const [reset, setreset] = useState(false);
  const [conteoDeProducto, setConteoDeProducto] = useState(1);
  const [shuffledCategories, setshuffledCategories] = useState<any[]>();
  const [listadoRandomProductos, setlistadoRandomProductos] =
    useState<generalProduct[]>();
  const [arr, setArr] = useState<Product[]>();
  const [indexCombo, setindexCombo] = useState<{}>();
  const shareLink = `https://licoreriaspondylus.com${router.asPath}`;
  useEffect(() => {
    setVariant({ ...singleProduct, index: 0 });
    setreset(!reset);

    setlistadoRandomProductos(
      listadoProductos(
        categories,
        products,
        singleProduct,
        Number(singleProduct.productId.slice(10, 11)),
        onPc
      )
    );

    // podriaInteresarteFunc()
  }, [singleProduct]);
  useEffect(() => {
    setshuffledCategories(categories.sort(() => Math.random() - 0.5));
  }, []);
  const categoriaALaQuePertenece = () => {
    return format(
      categories?.find((x) => x.categoryId === singleProduct.categoryId)?.title
    );
  };

  useEffect(() => {
    if (singleProduct.combo) {
      const updatedArr: Product[] = [];
      let indexCombo_: { [key: number]: number } = {};
      for (let index = 0; index < singleProduct.combo.length; index++) {
        const productoRecomendado = products.find(
          (e) => e.productId === singleProduct.combo[index].slice(0, 10)
        );
        indexCombo_[index] = Number(singleProduct.combo[index].slice(10, 11));
        if (productoRecomendado) {
          updatedArr.push(productoRecomendado);
        }
      }
      setindexCombo(indexCombo_);
      setArr(updatedArr); // Actualiza el estado de arr con el nuevo array de productos
    }
  }, [singleProduct?.combo, products]);
  return (
    <>
      <ProductSeo
        singleProduct={singleProduct}
        variant={variant}
        categoriaALaQuePerteneceElProducto={categoriaALaQuePertenece()}
      />
      <div className=" lg:max-w-[1400px] lg:mx-auto  lg:pr-3">
        {router.query.fm == "true" && (
          <div
            onClick={() => router.back()}
            className="absolute z-[2] top-[20px] cursor-pointer bg-paleta-300 right-4 rounded-full p-2"
          >
            <I size={24} className="stroke-paleta-800" icon="IconX"></I>
          </div>
        )}

        <div className="bg-white text-gray-600 mb-4 flex ">
          <div className="lg:w-[70%]">
            <div className="bg-paleta-200 lg:bg-transparent rounded-b-[24px] ">
              <div className="pt-4 pl-4">
                <P className="text-[.7rem] lg:text-[1.2rem]">
                  <Link className="hover:underline" href={"/"}>
                    Inicio
                  </Link>
                  {"/"}
                  <Link className="hover:underline" href={"/menu"}>
                    Catálogo
                  </Link>
                  {"/"}
                  <Link
                    className="capitalize hover:underline"
                    href={{
                      pathname: "/menu/[categoria]",
                      query: {
                        categoria:
                          categoriaALaQuePertenece().toLocaleLowerCase(),
                      },
                    }}
                  >
                    {categoriaALaQuePertenece()}
                  </Link>
                  {"/"}
                  <span>{singleProduct.title}</span>
                </P>
              </div>
              {!onPc && (
                <div className="relative ">
                  <div className=" max-w-max w-full mx-auto pb-5 pt-5 flex items-center justify-center">
                    <TransformWrapper initialScale={1}>
                      <TransformComponent>
                        <ImageZoom reset={reset}>
                          <Img
                            lazy={false}
                            alt={`${singleProduct.title} ${variant?.name} cómpralo ahora en Nutrillacta`}
                            className="min-w-[250px] min-h-[250px] max-w-[250px] mx-auto rounded-[12px] aspect-square object-cover"
                            src={variant?.img?.src}
                          />
                        </ImageZoom>
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:max-w-[1200px] lg:mx-auto ">
              <div className="bg-paleta-300 text-paleta-900 px-4 flex flex-col gap-3 mt-4 lg:flex-row  ">
                {onPc && (
                  <div className="relative lg:w-[40%] ">
                    <div className=" max-w-max w-full mx-auto pb-5 pt-5 flex items-center justify-center">
                      <TransformWrapper smooth initialScale={1}>
                        <TransformComponent>
                          <ImageZoom reset={reset}>
                            <Img
                              lazy={false}
                              alt={`${singleProduct.title} ${variant?.name} cómpralo ahora en Nutrillacta`}
                              className="min-w-[250px] min-h-[250px] max-w-[250px] lg:min-w-[350px] mx-auto rounded-[12px] aspect-square object-cover"
                              src={variant?.img?.src}
                            />{" "}
                          </ImageZoom>
                        </TransformComponent>
                      </TransformWrapper>
                    </div>{" "}
                  </div>
                )}
                <div className="flex flex-col gap-1 lg:gap-0 lg:w-[60%]">
                  <div ref={containerRef} className="flex items-center mb-3">
                    <h1 className="capitalize text-left lg:flex lg:gap-2 lg:items-center text-gray-800 text-[1.5rem] lg:text-[2rem] font-semibold  leading-[2rem]">
                      <span>
                        {singleProduct.title}{" "}
                        <span className="font-medium text-gray-700  ">
                          {" "}
                          | {singleProduct.name}
                        </span>
                      </span>
                      {onPc &&
                        singleProduct.top == 1 &&
                        singleProduct.title.length < 15 && (
                          <div className="flex gap-2 items-center px-4 py-1 text-black/40 border border-black/10 rounded-[5px]">
                            <I
                              icon="IconStar"
                              size={20}
                              className="stroke-black/20"
                            ></I>
                            <span className="text-[.9rem]">Popular</span>
                          </div>
                        )}
                    </h1>
                  </div>
                  <div className="w-full h-[1px] bg-black/10"></div>
                  <>
                    {" "}
                    <div className="flex items-center gap-1 mt-3 mb-2">
                      <p className="text-[1rem] text-gray-700">
                        {singleProduct.price && (
                          <>
                            <div className="flex gap-1 items-center">
                              <span className="font-bold text-[1.2rem]">
                                ${parseFloat(singleProduct.price).toFixed(2)}
                              </span>
                              {singleProduct.oldPrice != 0 &&
                                !isNaN(singleProduct.oldPrice) && (
                                  <p className="text-[.9rem] lg:text-[.95rem] line-through text-black/30">
                                    {Number(singleProduct?.oldPrice).toFixed(2)}
                                  </p>
                                )}
                            </div>
                          </>
                        )}
                      </p>
                      {Number(singleProduct.oldPrice) -
                        Number(singleProduct.price) >
                        0 && (
                        <div className="w-full flex justify-between items-center pr-1">
                          <div className="flex gap-1  items-center">
                            <Icons
                              className="w-5 h-5 fill-paleta-100"
                              icon="check"
                            ></Icons>
                            <p className="text-[.9rem] lg:text-[.95rem] text-paleta-100">
                              $
                              {(
                                Number(singleProduct.oldPrice) -
                                Number(singleProduct.price)
                              ).toFixed(2)}{" "}
                              <span className="text-paleta-800">
                                {" "}
                                de descuento
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                  <div className="flex flex-col gap-1  text-gray-700 relative lg:max-w-[550px] w-full ">
                    {onPc && (
                      <div className="flex gap-2 items-center mb-2 ">
                        <P className="px-4 py-1   border border-blaze-orange-600  text-blaze-orange-600 rounded-[5px] w-max">
                          {
                            <Link
                              className="capitalize hover:underline"
                              href={{
                                pathname: "/menu/[categoria]",
                                query: {
                                  categoria: categoriaALaQuePertenece(),
                                },
                              }}
                            >
                              {categoriaALaQuePertenece()}
                            </Link>
                          }
                        </P>
                        {singleProduct.grado !== undefined && (
                          <P>{singleProduct.grado}° grado alcohólico</P>
                        )}
                      </div>
                    )}

                    <P className="font-[400] text-black/80 ">
                      {singleProduct.description}
                    </P>
                    <CuadradoDePrecioPc
                      showInformacionInfo
                      mobile
                      variant={variant ?? undefined}
                      price={variant != undefined ? variant.price : ""}
                      conteoDeProducto={conteoDeProducto}
                      singleProduct={singleProduct}
                    />
                  </div>
                  {singleProduct?.combo && singleProduct?.combo?.length > 1 && (
                    <div className="text-gray-700">
                      <h2 className="text-gray-800 font-medium my-1 mb-2">
                        Productos que vienen en este combo
                      </h2>
                      <div className="flex flex-col gap-2">
                        {arr?.map((e, index) => (
                          <div className="flex lg:h-[80px] border border-black/10 rounded-[9px] py-3 items-center  justify-evenly">
                            <Img
                              width="10"
                              lazy={false}
                              alt={`${e.title} ${variant?.name} cómpralo ahora en Nutrillacta`}
                              className="w-1/5 lg:w-auto lg:h-full"
                              //@ts-ignore
                              src={e.variants[indexCombo[index]].img?.src}
                            />{" "}
                            <div className=" w-[60%]  lg:h-max   flex-col flex items-start justify-start">
                              <p className=" font-bold text-[1.1rem]">
                                {e.title}{" "}
                                <span className="text-[.9rem] font-light">
                                  {/* @ts-ignore */}
                                  {e.variants[indexCombo[index]]?.name}
                                </span>{" "}
                              </p>{" "}
                              <div className="max-w-[120px] min-w-[120px] flex gap-2 items-center">
                                {indexCombo != undefined && (
                                  <span className="text-[.9rem] font-normal">
                                    $
                                    {Number(
                                      /* @ts-ignore */
                                      e.variants[indexCombo[index]]?.price
                                    ).toFixed(2)}
                                  </span>
                                )}

                                <BotonAgregarAlCarro
                                  fromCombo
                                  singleProduct={{ ...e, ...e.variants?.[0] }}
                                  index={0}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" px-4 mt-2 mb-1 text-gray-600 font-medium  lg:text-[1.1rem]">
              Compartir este producto
              <div className="flex gap-1 mt-1">
                <FacebookShareButton
                  url={shareLink}
                  hashtag={"#licoreriaSpondylus"}
                >
                  <FacebookIcon size={32} />
                </FacebookShareButton>
                <WhatsappShareButton url={shareLink}>
                  <WhatsappIcon size={32} />
                </WhatsappShareButton>
                <TelegramShareButton url={shareLink}>
                  <TelegramIcon size={32} />
                </TelegramShareButton>
                <LinkedinShareButton url={shareLink}>
                  <LinkedinIcon size={32} />
                </LinkedinShareButton>
                <div
                  onClick={() => {
                    mostrarMensaje("Copiado al portapapeles", 2700);
                    navigator.clipboard.writeText(shareLink);
                  }}
                  className="bg-[#4326c4] cursor-pointer flex items-center justify-center w-[32px] h-[32px]"
                >
                  <I
                    size={18}
                    stroke={1.6}
                    className="stroke-white"
                    icon="IconLink"
                  ></I>
                </div>
              </div>
            </div>

            <div className="px-4">
              <h2 className="mb-1 text-gray-600  font-medium mt-2 lg:text-[1.1rem]">
                Mirar por categorías:
              </h2>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {shuffledCategories?.map((data, index) => {
                  var emojis = ["🍺", "🥃", "🍻", "🚬", "🥤", "🍬", "🍸", "🍹"];
                  if (index > 4) return;
                  return (
                    <Link
                      href={{
                        pathname: "/menu/[categoria]",
                        query: {
                          categoria: format(data.title),
                        },
                      }}
                      className="border text-[.9rem] lg:text-[1rem] w-max flex flex-wrap rounded-[6px] bg-paleta-200 px-2 py-1 items-center"
                      key={index}
                    >
                      <span className="mr-1">
                        {emojis[Math.floor(Math.random() * emojis.length)]}
                      </span>
                      <span className="capitalize">{data.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="px-3 pt-3">
              <h1 className="text-[1.2rem] mb-3 font-bold text-paleta-900 ">
                Podría interesarte
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 w-[100%] gap-2 mx-auto">
                {listadoRandomProductos?.map((product, index) => {
                  if (index >= (onPc ? 6 : 8)) return;
                  return (
                    <TarjetaProductoVertical
                      index={index}
                      product={{ ...product.producto, ...product.variante }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <CuadradoDePrecioPc
            containerRef={containerRef}
            variant={variant ?? undefined}
            price={variant != undefined ? variant.price : ""}
            conteoDeProducto={conteoDeProducto}
            singleProduct={singleProduct}
          />
        </div>
        <CuadradoDePrecioPc
          mobile
          variant={variant ?? undefined}
          price={variant != undefined ? variant.price : ""}
          conteoDeProducto={conteoDeProducto}
          singleProduct={singleProduct}
        />

        {onPc && (
          <div>
            <h1 className="text-[1.2rem] mb-3 font-bold text-paleta-900 pl-3 ">
              Relacionados
            </h1>
            <div className="grid lg:grid-cols-4 w-[100%] px-3 gap-2 ">
              {listadoRandomProductos?.map((product, index) => {
                if (index < 6) return;
                if (index >= 18) return;

                return (
                  <TarjetaProductoVertical
                    index={index}
                    key={index}
                    product={{ ...product.producto, ...product.variante }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default withContext(Index);
export const getStaticPaths = async () => {
  const products = (await url("products")) as Product[];
  const categories = await url("categories");
  const paths = products.map(async (product) => {
    return product.variants.map((variant, index) => {
      const producto = format(`${product.title}-${variant.name}`);

      const category = categories.find(
        (category: Category) => category.categoryId === product.categoryId
      );

      const categoria = category ? format(category?.title)?.toString() : "";
      return {
        params: {
          categoria: categoria,
          producto: producto,
        },
      };
    });
  });

  // Esperar a que todas las promesas se resuelvan
  const resolvedPaths = await Promise.all(paths);

  return {
    paths: resolvedPaths.flat(),
    fallback: false,
  };
};
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const products = (await url("products")) as Product[];
  //@ts-ignore
  const productId = context.params.producto;
  let singleProduct = {};
  const res = products.find((product) => {
    const exist = product.variants.find((variant, index) => {
      if (format(`${product.title}-${variant.name}`) == productId) {
        const g = { ...product, ...variant, index };
        singleProduct = g;
        return g;
      } else {
        return undefined;
      }
    });

    if (exist != undefined) {
      return { ...exist, product };
    }
  });

  const cards = await url("cards");
  const categories = await url("categories");
  const value = {
    products,
    categories,
    cards,
    singleProduct: singleProduct,
  };

  return { props: value };
};
