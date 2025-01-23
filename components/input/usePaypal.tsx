import useMessage from "@/context/message/useMessage";
import React, { useEffect, useState } from "react";

function usePaypal(call: boolean = true) {
  const domain = "https://paypal-llampukaq.koyeb.app";
  const api = `${domain}`;
  const [clientToken, setClientToken] = useState(null);
  const { messagePromise } = useMessage();
  useEffect(() => {
    call && generateToken();
  }, []);
  const generateToken = async () => {
    const response = await (
      await fetch(`${api}/v1/identity/generate-token`, {
        method: "POST",
      })
    ).json();

    setClientToken(response?.client_token || response?.clientToken);
  };
  const createOrder = async (data: any) => {
    const response = await (
      await fetch(`${api}/v2/checkout/orders`, {
        method: "POST",
        body: JSON.stringify(data),
      })
    ).json();
    return response;
  };
  const captureOrder = async (orderId: string) => {
    const response = await (
      await fetch(`${api}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
      })
    ).json();
    return response;
  };
  const authToken = async () => {
    const response = await (
      await fetch(api, {
        method: "POST",
      })
    ).json();
    return response;
  };
  return { clientToken, generateToken, createOrder, captureOrder, authToken };
}

export default usePaypal;
