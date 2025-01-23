import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { Variant } from "@/services/url";

import { Product } from "@/services/url";
import { Icons as I } from "@llampukaq/icons";
import Icons from "@/styles/Icons";

interface BotonAgregarAlCarroProps {
  singleProduct: Product & Variant;
  index: number;
  fromCombo?: boolean;
  one?: boolean;
}

export const BotonAgregarAlCarro: React.FC<BotonAgregarAlCarroProps> = ({
  singleProduct,
  fromCombo,
  one,
  index,
}) => {
  const { addCart, shop, removeCart } = useCart();
  const [variant, setVariant] = useState<Variant & { index: number }>();
  const [conteoDeProducto, setConteoDeProducto] = useState(1);
  const [animacionEntrada, setAnimacionEntrada] = useState(false);
  const [clicked, setclicked] = useState(false);
  useEffect(() => {
    const exist = shop.find(
      (x) => x.productId == `${singleProduct.productId}${index}`
    );

    if (exist != undefined) {
      setConteoDeProducto(exist.count);
      setclicked(true);
    }
    if (fromCombo) {
      setclicked(true);
    }

    setVariant({ ...singleProduct?.variants?.[0], index: 0 });
  }, [singleProduct, shop]);
  const sumarUno = () => {
    addCart(`${singleProduct?.productId}${variant?.index}`);
  };
  const restarUno = () => {
    removeCart(`${singleProduct?.productId}${variant?.index}`);
  };

  if (clicked) {
    return (
      <div className="z-[2] w-full max-w-[550px] bg-white ">
        {singleProduct.variants.length > 1 && fromCombo === false && (
          <div className="flex items-center justify-evenly mb-1">
            {singleProduct.variants.map((e, index) => (
              <span
                onClick={() => {
                  setVariant({ ...e, index });
                }}
                className={`${
                  e.name == variant?.name ? "bg-gray-300" : ""
                } text-[.8rem] text-gray-600 px-2 p-1 border rounded-[6px] border-gray-400`}
              >
                {e.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between w-full">
          <div className="mx-auto text-[.9rem] flex items-center gap-2 border-2 h-[34px] rounded-[7px] border-paleta-800">
            <div
              onClick={restarUno}
              className="w-[28px] cursor-pointer h-full  p-2 px-4 bg-paleta-800   rounded-[0px] flex justify-center items-center"
            >
              <I
                stroke={5}
                size={12}
                className="stroke-white"
                icon="IconMinus"
              ></I>
            </div>
            <p className="text-center min-w-[12px] px-0 ">{conteoDeProducto}</p>
            <div
              onClick={sumarUno}
              className="w-[28px] cursor-pointer h-full  p-2 px-4 bg-paleta-800 text-white rounded-[0px] flex justify-center items-center"
            >
              <I
                stroke={5}
                size={12}
                className="stroke-white"
                icon="IconPlus"
              ></I>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          setclicked(true);
          sumarUno();
        }}
        className={`${
          one ? "bg-blaze-orange-500" : "bg-paleta-800"
        } bg-  h-[34px]  rounded-[9px] w-full flex items-center justify-center p-1 py-1 gap-1 relative `}
      >
        <div
          className={`absolute z-[0] anim-opacity-boton ${
            animacionEntrada ? "opacity-100" : "opacity-0"
          } `}
        >
          <Icons className={`fill-paleta-300 `} icon="check"></Icons>
        </div>
        <div
          className={` flex gap-1 items-center justify-center anim-text-opacity ${
            animacionEntrada ? "text-[#82330c]" : "text-white"
          } `}
        >
          {
            <p className="thin-texto text-[.8rem] lg:text-[.9rem] font-[400]">
              Comprar
            </p>
          }

          <div className="min-h-[22px]"></div>
        </div>
      </button>
    </>
  );
};
