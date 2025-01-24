import { ICONS, Icons } from "@/icons";
import React from "react";
import { Icons as I } from "@/icons";
interface Social {
  titulo: string;
  link: string;
  icon: ICONS;
}

export default function RedesSociales() {
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
    <div className="flex flex-col border rounded-[10px] p-5">
      <I className="stroke-paleta-100" size={30} icon="IconSocial"></I>
      <h1 className="text-[1.2rem] font-bold">Redes sociales</h1>
      <p>
        Recuerda seguirnos en todas nuestras redes para estar al tanto de
        nuestros avisos y promociones.
      </p>
      <div className="flex justify-center items-center gap-12 mt-4">
        {datos.map((e) => (
          <a
            href={`${e.link}`}
            target="_blank"
            className="cursor-pointer flex flex-col gap-2 items-center"
          >
            <div>
              <Icons
                size={28}
                className="stroke-paleta-900"
                icon={e.icon}
              ></Icons>
            </div>
            {/* <p className="text-[.8rem]">{e.titulo}</p> */}
          </a>
        ))}
      </div>
    </div>
  );
}
