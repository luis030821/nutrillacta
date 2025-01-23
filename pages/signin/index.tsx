import Signin from "@/infraestructure/signin/Signin";
import { useIsLogin } from "@llampukaq/realm";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function index() {
  const { isLogin } = useIsLogin();

  return (
    <div className="h-[calc(100vh_-_180px)] w-full flex items-center justify-center">
      {isLogin ? <Redirect /> : <Signin />}
    </div>
  );
}
const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/account");
  }, []);
  return <></>;
};
