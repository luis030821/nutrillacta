import Layout from "@/components/layout/Layout";
import "@/public/assets/css/fonts.css";
import "@/public/assets/css/animaciones.css";
import "@/styles/globals.css";
import "@/styles/tools.css";
import type { AppProps } from "next/app";
import MainContextComponent from "@/context/MainContext";
import CartContext from "@/context/CartContext";
import { IconsProvider } from "@/icons";
import Solved from "@/context/Solved";
import { MessageProvider } from "@/context/message/MessageProvider";
import NavBarTop from "@/components/layout/NavBarTop";
import { ConfirmarCompraProvider } from "@/infraestructure/confirmarCompra/context/ConfirmarCompraProvider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Solved>
      <MessageProvider>
        <IconsProvider value={{ className: "stroke-black" }}>
          <MainContextComponent>
            <CartContext>
              <Layout>
                <NavBarTop />
                <ConfirmarCompraProvider>
                  <Component {...pageProps} />
                </ConfirmarCompraProvider>
              </Layout>
            </CartContext>
          </MainContextComponent>
        </IconsProvider>
      </MessageProvider>
    </Solved>
  );
}
