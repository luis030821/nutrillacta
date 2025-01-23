import GalleryComponent from "@/components/img/GalleryComponent";
import React from "react";

export default function GaleriaQueMuestraEnHome() {
  const images = [
    {
      img: "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_p3gmez.jpg",
      thumbnail:
        "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_p3gmez.jpg",
      titulo: "Letrero principal",
      descripcion: "Tomado desde la calle Gonzalo Meneses",
      tags: ["sad", "azul"],
    },
    {
      img: "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_1_ruvvmi.jpg",
      thumbnail:
        "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_1_ruvvmi.jpg",
      titulo: "Letrero redondo",
      descripcion: "Tomado desde la calle Gonzalo Pizarro",
      tags: ["sad", "azul"],
    },
    {
      img: "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_2_t6o49e.jpg",
      thumbnail:
        "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_2_t6o49e.jpg",
      titulo: "Puerta principal de atención",
      descripcion: "",
      tags: ["sad", "azul"],
    },
    {
      img: "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_3_oyylyf.jpg",
      thumbnail:
        "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_3_oyylyf.jpg",
      titulo: "Estante de bebidas",
      descripcion: "",
      tags: ["sad", "azul"],
    },
    {
      img: "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_4_kf22m8.jpg",
      thumbnail:
        "https://res.cloudinary.com/ddcoxtm2v/image/upload/v1716596166/photo1716595807_4_kf22m8.jpg",
      titulo: "Interior del local",
      descripcion: "",
      tags: ["sad", "azul"],
    },
  ];

  return <GalleryComponent images={images}></GalleryComponent>;
}
