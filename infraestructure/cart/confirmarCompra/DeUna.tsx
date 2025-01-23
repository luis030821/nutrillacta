import React from "react";

export default function DeUna() {
  return (
    <div className="text-[.9rem]  w-full text-gray-600  mt-1">
      <p className="text-[.9rem] text-gray-600">
        Debes transferir el <strong>monto total</strong> de tu pedido. Una vez
        lo hagas, toma captura del pago y finaliza el pedido para ser
        automáticamente atendido.
        {/* <span onClick={() => modal?.open()} className="underline">
              Más información
            </span> */}
      </p>
      <div>
        <img src="assets/png/qr_deUna.png" className="py-2" alt="" />
        <p className="font-bold text-center">Luis Ortega</p>
      </div>
    </div>
  );
}
