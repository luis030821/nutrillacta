import { User } from "@/interface";
import { useUser } from "@llampukaq/realm";
import React from "react";
import { Settings, SettingsContainer, SettingsItem } from "./Settings";
import { ICONS, Icons } from "@/icons";
import { useLogoutGoogle } from "@llampukaq/realm-google-provider";
import Dirrection from "./MePages/Dirrection";
import Button from "@/components/button/Button";
import Orders from "./MePages/Orders";
import { useRouter } from "next/router";
import { getGreeting } from "../cart/funciones";
import Img from "@/components/img/Img";
import { NextSeo } from "next-seo";
import Cards from "./MePages/Cards";
import Transferia from "./MePages/Transferia";

import MeSettings from "./MePages/MeSettings";
import client from "@/client";

const FormularioQueja = () => {
  return (
    <div className="p-3  rounded-[10px]">
      <div className="relative">
        <textarea
          name="floating_first_name"
          id="floating_first_name"
          className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px] border-paleta-300 appearance-none border-paleta-500/30 focus:border-paleta-200 focus:outline-none focus:ring-0  peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_first_name"
          className="peer-focus:font-medium px-2 absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
        >
          Escribe aquí
        </label>
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button>Enviar</Button>
      </div>
    </div>
  );
};

function MePages() {
  const configuracion: {
    title: string;
    icon: ICONS;
    description: string;
    c: any;
  }[] = [
    {
      title: "Configuracion",
      icon: "IconUserBolt",
      description: "Configura los datos del usuario",
      c: <MeSettings />,
    },
    {
      title: "Mis pedidos",
      icon: "IconPaperBag",
      description: "Trackea tu pedido o mira el historial de tus pedidos",
      c: <Orders />,
    },
    {
      title: "Direcciones",
      icon: "IconMap",
      description: "Accede, edita o agregua una nueva dirreción",
      c: <Dirrection />,
    },
    {
      title: "Tarjetas",
      icon: "IconCreditCard",
      description: "Gestiona tus tarjetas de débito/crédito",
      c: <Cards />,
    },
    {
      title: "Transferencias",
      icon: "IconCards",
      description: "Mira las cuentas para depositar en transferencias",
      c: <Transferia />,
    },
    {
      title: "Recomendaciones y sugerencias",
      icon: "IconBug",
      description:
        "Realizar observaciones o quejas acerca del servicio ofrecido",
      c: <FormularioQueja />,
    },
    {
      title: "Contacto y sesión",
      icon: "IconUserCode",
      description: "Finaliza tu sesión y contáctanos con nosotros",
      c: (
        <div className="w-12/12 mx-auto max-w-[440px]">
          <a
            target="_blank"
            referrerPolicy="no-referrer"
            href={`https://api.whatsapp.com/send?phone=593${Number(
              client.celular
            )}&text=${getGreeting()}, necesito ayuda con lo siguiente: `}
            className="text-gray-600 py-3 gap-2 space-x-2 flex  items-center border border-[#e0e0e0] p-2 rounded-[10px]  "
          >
            <div className="flex justify-center  items-center flex-col rounded-full">
              <div className={`flex justify-center items-center relative `}>
                <Icons
                  className="stroke-green-500 ml-2"
                  size={32}
                  icon={"IconBrandWhatsapp"}
                />
              </div>
            </div>
            <div className="text-gray-600">
              <h2 className="mb-1 font-medium">¿Necesitas ayuda?</h2>
              <p className="text-[.8rem] ">
                Chatea con una persona que resolverá todas tus dudas
              </p>
            </div>
          </a>
          <Button
            className="max-w-9/12 w-full bg-red-500 mt-3"
            center
            onClick={() => {
              logout();
              router.push("/signin");
              window.localStorage.clear();
            }}
          >
            Finalizar sesión
          </Button>
        </div>
      ),
    },
  ];
  const { user } = useUser<User>();
  const router = useRouter();
  const { logout } = useLogoutGoogle();
  return (
    <div className="p-5 flex flex-col gap-3">
      <NextSeo title="Cuenta | Nutrillacta " description="" />
      <div className="w-full border border-[#e0e0e0] items-center justify-center  flex rounded-[12px]  px-3 py-3 ">
        <div className="flex relative max-w-[240px] items-center justify-center gap-2">
          <Img
            link
            width="100"
            src={`https://robohash.org/${user?.userId}.png`}
            className="rounded-full logo w-[56px] h-[56px] border-2 border-paleta-100"
            alt="logo"
          />
          <h2 className="text-gray-600 font-medium text-[1rem]">
            {user?.name}
          </h2>
        </div>
      </div>
      <div className="h-max">
        <Settings>
          <SettingsContainer title="Configuración">
            {configuracion.map((e) => (
              <SettingsItem
                description={e.description}
                title={e.title}
                icon={e.icon}
              >
                {e.c}
              </SettingsItem>
            ))}
          </SettingsContainer>
        </Settings>
      </div>
    </div>
  );
}

export default MePages;
