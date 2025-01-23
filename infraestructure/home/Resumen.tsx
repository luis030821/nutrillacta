import { useCart } from "@/context/CartContext";
import { useData } from "@/context/withContext";
import { Product } from "@/services/url";

import { useConfirmarCompra } from "../confirmarCompra/context/ConfirmarCompraProvider";
import DataStyle from "@/components/text/DataStyle";
import Text from "@/components/text/Text";

const ProductShow = ({
  product,
  count,
  variant,
}: {
  product: Product | undefined;
  count: number;
  variant: number | string;
}) => {
  return (
    <div className="relative shrink-0 flex flex-col items-center justify-center lg:border-2 lg:border-black/10 lg:rounded-[5px]">
      <Text className="text-black/50" type="BodySm(Medium)">
        {/* @ts-ignore */}x{count} {product?.title}{" "}
        {product?.variants?.[variant]?.name}
      </Text>
    </div>
  );
};
export default function Resumen() {
  const { products } = useData();
  const { shop } = useCart();
  const { cartPriceAll, fee40, fee60, addressId, price } = useConfirmarCompra();

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full text-[.8rem] lg:text-[1rem]  ">
        <div className="lg:ml-1 flex w-full overflow-x-auto  lg:overflow-y-auto gap-2 p-2 lg:p-0 rounded-[12px] lg:grid lg:grid-cols-4">
          {shop.map((x) => (
            <ProductShow
              variant={x.productId.slice(-1)}
              count={x.count}
              product={products.find(
                (e: Product) =>
                  e.productId ==
                  x.productId.substring(0, x.productId.length - 1)
              )}
            />
          ))}
        </div>
        <div className="w-full">
          <DataStyle title="Subtotal">
            ${Number(cartPriceAll).toFixed(2)}
          </DataStyle>
        </div>

        {addressId == "PICKUP" ? (
          <div className="w-full">
            <DataStyle title="Tarifa de envío">$0.00</DataStyle>

            <DataStyle title="Tarifa de servicio">
              ${fee40?.toFixed(2)}
            </DataStyle>
          </div>
        ) : (
          <div className="w-full">
            {fee60 != 0 ? (
              <>
                <DataStyle title="Tarifa de envío">
                  ${fee60?.toFixed(2)}
                </DataStyle>

                <DataStyle title="Tarifa de servicio">
                  ${fee40?.toFixed(2)}
                </DataStyle>
              </>
            ) : (
              <>
                <DataStyle title="Tarifa de envío">Por calcular...</DataStyle>
              </>
            )}
          </div>
        )}
        <div className=" text-sm lg:text-[1rem] lg:pt-2 font-bold w-full border-t-[2px] ">
          <div></div>
          <DataStyle title="Total">${Number(price).toFixed(2)}</DataStyle>
        </div>
      </div>
    </>
  );
}

// return (
//   <>
//     {" "}
//     <div className="flex flex-col items-start justify-start w-full text-[.8rem] ">
//       <div className="bg-paleta-600 rounded-[6px]  flex w-full flex-col p-2">
//         {shop.map((x) => (
//           <ProductShow
//             count={x.count}
//             product={products.find(
//               (e: Product) =>
//                 e.productId ==
//                 x.productId.substring(0, x.productId.length - 1)
//             )}
//           />
//         ))}
//       </div>

//       <div className="w-full flex justify-between items-center mt-1">
//         <p>Subtotal:</p>
//         <p>${Number(cartPriceAll).toFixed(2)}</p>
//       </div>
//       {addressId == "PICKUP" ? (
//         <>
//           <div className="w-full  flex justify-between items-center ">
//             <p>Tarifa de envío:</p>
//             <p>$0.00</p>
//           </div>
//           <div className="w-full  flex justify-between items-center mb-1">
//             <p>Tarifa de servicio:</p>
//             <p>${fee40.toFixed(2)}</p>
//           </div>
//         </>
//       ) : (
//         <>
//           {fee60 != 0 ? (
//             <>
//               <div className="w-full  flex justify-between items-center ">
//                 <p>Tarifa de envío:</p>
//                 <p>{fee60.toFixed(2)}</p>
//               </div>
//               <div className="w-full  flex justify-between items-center mb-1">
//                 <p>Tarifa de servicio:</p>
//                 <p>{fee40.toFixed(2)}</p>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="w-full  flex justify-between items-center ">
//                 <p>Tarifa de envío:</p>
//                 <p>Por calcular...</p>
//               </div>
//               <div className="w-full  flex justify-between items-center mb-1">
//                 <p>Tarifa de servicio:</p>
//                 <p>Por calcular...</p>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       <div className="font-bold w-full  flex justify-between items-center border-t-[2px] ">
//         <p className="mt-2 text-[1rem]">Total:</p>
//         <p className="text-[1rem]">
//           {Number(cartPriceAll + fee40 + fee60).toFixed(2)}
//         </p>
//       </div>
//     </div>
//   </>
// );
