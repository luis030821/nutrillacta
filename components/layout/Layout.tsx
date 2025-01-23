import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useMainContext from "@/context/useMainContext";
function Layout({ children }: { children: ReactNode }) {
  const [minHeight, setMinHeight] = useState<number>(0);
  const { onPc } = useMainContext();
  useEffect(() => {
    const updateMinHeight = () => {
      setMinHeight(window.innerHeight);
    };
    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);
    return () => {
      window.removeEventListener("resize", updateMinHeight);
    };
  }, []);
  return (
    <div className="">
      {!onPc && <Navbar />}
      <div
        style={{
          minHeight: onPc ? `${minHeight - 136}px` : `${minHeight - 190}px`,
        }}
        className={`  ${onPc ? "mt-[136px] w-full min-w-screen" : "mt-[80px]"}`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
