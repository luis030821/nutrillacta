import { Icons } from "@/icons";
import React, { useState, useEffect } from "react";

const DeliveryTime = () => {
  const [deliveryTime, setDeliveryTime] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [updating, setUpdating] = useState(false);

  const calculateDeliveryTime = () => {
    const now = new Date();
    const additionalMinutes = Math.floor(Math.random() * 6) + 29;
    now.setMinutes(now.getMinutes() + additionalMinutes);
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    setDeliveryTime(calculateDeliveryTime());

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          setUpdating(true);
          setTimeout(() => {
            setDeliveryTime(calculateDeliveryTime());
            setUpdating(false);
            setCountdown(60);
          }, 1200); // Simulamos un pequeño retraso para la actualización
          return 60;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full  mx-auto bg-whites overflow-hidden text-[.9rem]">
      <div className="md:flex">
        <div className="flex items-center flex-col">
          <div className="flex items-center">
            {/* <span className="shrink-0">🏍️💨</span> */}
            {updating ? (
              <p className=" text-gray-500 w-full">Actualizando oferta...</p>
            ) : (
              <p className=" text-gray-500 w-full">
                Si ordenas ahora el pedido llegara hoy día a las {deliveryTime}
              </p>
            )}
          </div>

          <div className=" text-red-500">
            La oferta se actualizará en {countdown}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;
