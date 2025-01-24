import { useOrders } from "@/backend/useOrders";
import Img from "@/components/img/Img";
import ModalTrigger from "@/components/ModalTrigger";
import { useData } from "@/context/withContext";
import { Product } from "@/services/url";
import { Icons } from "@/icons";
import dayjs from "dayjs";

function Orders() {
  const { orders, ordersFinally } = useOrders();
  const { products } = useData();
  return (
    <div className="w-11/12 mx-auto">
      {orders != undefined ? (
        <>
          <p className="font-bold text-center my-3">Ordenes activas</p>
          <div className="flex overflow-x-auto gap-5">
            {orders?.map((order) => (
              <div className="w-full bg-paleta-100/90 rounded-xl p-3 flex-shrink-0">
                <div className="flex justify-between p-5">
                  <p className="text-white text-center font-bold">
                    Estatus de la orden
                  </p>
                  <ModalTrigger
                    title="Qr"
                    trigger={
                      <Icons className="stroke-paleta-200" icon="IconQrcode" />
                    }
                  ></ModalTrigger>
                </div>

                <div className="flex justify-between ">
                  <p className="text-white">Idenficador</p>
                  <p className="text-white/80">{order.orderId}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-white text-base">Estatus de la orden</p>
                  <p className="text-white/80 text-sm">{order.status}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="text-white">Precio</p>
                  <p className="text-white/80">${order.price}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="text-white">Metodo de pago</p>
                  <p className="text-white/80">
                    {order.payment == "cash" && "Efectivo"}
                    {order.payment == "paypal" && "Paypal"}
                    {order.payment == "transfer" && "Transferencia"}
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="text-white">Envio</p>
                  <p className="text-white/80">
                    {order.to.addressId == "PICKUP"
                      ? "Retiro en Local"
                      : "Envio a domicilio"}
                  </p>
                </div>
                <div>
                  <ModalTrigger
                    title="Productos ordenados"
                    trigger={
                      <div className="flex justify-center text-white stroke-paleta-200 p-3">
                        <p>Mirar productos ordenados</p>
                        <Icons
                          className="stroke-paleta-200"
                          icon="IconShoppingBag"
                        />
                      </div>
                    }
                  >
                    {order?.shop.map((x, index) => (
                      <PrintProduct
                        key={index}
                        count={x.count}
                        index={parseFloat(
                          x.productId.charAt(x.productId.length - 1)
                        )}
                        product={products?.find(
                          (e) =>
                            e.productId ==
                            x.productId.substring(0, x.productId.length - 1)
                        )}
                      />
                    ))}
                  </ModalTrigger>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className=" rounded-xl flex items-center justify-center w-full ">
        {ordersFinally?.length != 0 ? (
          <>
            <div className="w-full">
              <div className="flex flex-col gap-5 px-5 pt-6">
                <h1 className="text-[1.2rem] text-center">
                  Pedidos Finalizados{" "}
                  <span className="text-paleta-900/40">
                    ({ordersFinally?.length})
                  </span>
                </h1>
              </div>
              <div className="p-4 flex flex-col gap-12 space-y-3">
                {ordersFinally?.map((orderSync) => (
                  <div className="shadow-md relative border overflow-hidden rounded-[10px]">
                    {orderSync?.discard == undefined ? (
                      <div className="space-y-5 py-5 w-full ">
                        <div className="absolute w-full h-full z-[1] left-0 top-0 flex  gap-4 rounded-[6px] ">
                          <div
                            className={`h-[6px] w-1/3  ${
                              Number(orderSync?.status) >= 0
                                ? "bg-paleta-100"
                                : "bg-[lightgrey]"
                            } `}
                          ></div>
                          <div
                            className={`h-[6px] w-1/3  ${
                              Number(orderSync?.status) >= 50
                                ? "bg-paleta-100"
                                : "bg-[lightgrey]"
                            } `}
                          ></div>

                          <div
                            className={`h-[6px] w-1/3  ${
                              Number(orderSync?.status) >= 100
                                ? "bg-paleta-100"
                                : "bg-[lightgrey]"
                            } `}
                          ></div>
                        </div>
                        {orderSync?.status == "100" && (
                          <div className="flex flex-col justify-center items-center space-y-2">
                            <div className="flex gap-2 items-center max-w-[250px] mb-6">
                              <div className=" rounded-full">
                                <Icons size={70} icon="IconFileInvoice" />
                                <p className="text-center">3/3</p>
                              </div>
                              <div>
                                <h1>Orden finalizada</h1>
                                <p>
                                  El repartir dejó las bebidas en el lugar de
                                  entrega.
                                </p>
                              </div>
                            </div>
                            <div className="w-11/12 mx-auto">
                              <div className="flex justify-between w-full">
                                <p>Ordenado </p>
                                <p>
                                  {dayjs(orderSync.created).format(
                                    "DD/MM/YYYY hh:mmA"
                                  )}
                                </p>
                              </div>
                              <div className="flex justify-between w-full">
                                <p>Idenficador</p>
                                <p>{orderSync.orderId}</p>
                              </div>
                              <div className="flex justify-between w-full">
                                <p>Método de pago </p>
                                <p>{orderSync.payment}</p>
                              </div>
                              <div className="flex justify-between w-full">
                                <p>Total</p>
                                <p>${orderSync.price}</p>
                              </div>
                            </div>
                            <p className="text-left w-full pl-3">
                              Productos que compraste:
                            </p>
                            <div className="grid grid-cols-2">
                              {orderSync?.shop.map((x, index) => (
                                <PrintProduct
                                  key={index}
                                  count={x.count}
                                  index={parseFloat(
                                    x.productId.charAt(x.productId.length - 1)
                                  )}
                                  product={products.find(
                                    (e) =>
                                      e.productId ==
                                      x.productId.substring(
                                        0,
                                        x.productId.length - 1
                                      )
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <h1>Tu orden ha sido descartada</h1>
                        <p>Las razones pueden ser</p>
                        <p>Informacion falsa</p>
                        <p>No responde a los mensajes</p>
                        <p>No se ha confirmado la transferencia</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Orders;
const PrintProduct = ({
  count,
  product,
  index,
}: {
  product: Product | undefined;
  count: any;
  index: number;
}) => {
  const variant = product?.variants[index];
  return (
    <div className="flex p-2 rounded-xl items-center w-full">
      <div className="w-12 h-12 rounded-xl">
        <Img width="40" link src={variant?.img?.src} className="rounded-xl" />
      </div>
      <div className="px-2">
        <h1 className="text-center">{product?.title}</h1>
        <p className="text-center">Cantidad:{count}</p>
      </div>
    </div>
  );
};
