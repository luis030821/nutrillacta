import React from "react";
import Img from "../img/Img";
import { ICONS, Icons } from "@/icons";
import Link from "next/link";
import useMainContext from "@/context/useMainContext";
interface Social {
  titulo: string;
  link: string;
  icon: ICONS;
}
function Footer() {
  const { onPc } = useMainContext();
  const info = [
    {
      text: "Envíos",
      href: "/informacion",
    },
    {
      text: "Formas de pago",
      href: "/informacion",
    },
  ];
  const infoAboutLicor = [
    {
      text: "Términos y condiciones",
      href: "terminosYCondiciones",
    },
    {
      text: "Política de privacidad",
      href: "politicaPrivacidad",
    },
  ];

  const datos: Social[] = [
    {
      titulo: "@licoreriaSpondylus",
      link: "https://www.facebook.com/profile.php?id=61557148134647",
      icon: "IconBrandFacebook",
    },
    {
      titulo: "@licoreriaSpondylus",
      link: "https://www.instagram.com/licoreriaspondylus/",
      icon: "IconBrandInstagram",
    },
    {
      titulo: "@LSpondylus81146",
      link: "https://twitter.com/LSpondylus81146",
      icon: "IconBrandTwitter",
    },
  ];
  return (
    <footer
      className={`mb-[75px] lg:mb-0 lg:pt-12 lg:pb-5 bg-paleta-800 text-white/90 font-normal  mt-4 w-full border-t-[1px] border-[black/80] flex flex-col items-center justify-center `}
    >
      <div className="w-full  justify-start px-4 lg:max-w-[1200px] ">
        <div className="flex justify-center">
          <div>
            <h2 className="text-white/70 lg:text-white/90 font-medium mt-3 mb-2 lg:text-[1.1rem]">
              Social
            </h2>
            <span className="flex justify-evenly items-center gap-2 mt-4">
              {datos.map((e) => (
                <a
                  href={`${e.link}`}
                  target="_blank"
                  className="cursor-pointer flex flex-col gap-2 items-center"
                >
                  <span>
                    <Icons
                      size={28}
                      className="stroke-white/90 lg:hover:stroke-blaze-orange-500"
                      icon={e.icon}
                    ></Icons>
                  </span>
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mb-1 max-w-[1000px] mx-auto p-4 lg:mb-3 border-t-[1px] border-gray-400 mt-4 lg:mt-2 ">
        <span className="block text-[1rem] text-white/80 text-center">
          Nutrillacta © {new Date().getFullYear()}. Todos los derechos
          reservados.
        </span>

        <div className=" flex items-center justify-center pt-3 relative">
          <span className="text-[12px] lg:text-[.9rem] gap-1 text-white/80  flex items-center justify-center font-medium ">
            App web desarrollada y diseñada por{" "}
            <a
              className="underline lg:hover:text-blaze-orange-500 "
              target="_blank"
              referrerPolicy="no-referrer"
              href="https://ismac.edu.ec/"
            >
              Instituto tecnologico Ismac
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
