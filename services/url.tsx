import client from "@/client";

export const url = async (url: "products" | "cards" | "categories") => {
  if (url == "categories") {
    const r = `${client.llampukaqPro}/v1/organization/${client.organizationId}/${url}`;
    const j = await fetch(r);
    const categories = (await j.json()) as Category[];
    const indexToRemove = categories.findIndex(
      (category) => category.title === "no_disponible"
    );
    if (indexToRemove !== -1) {
      categories.splice(indexToRemove, 1);
    }

    const sortedCategories = categories
      .map((category, index) => ({
        ...category,
        position: category.position ?? index,
      }))
      .sort((a, b) => a.position - b.position);

    return sortedCategories;
  } else {
    if (url == "products") {
      const r = `${client.llampukaqPro}/v1/organization/${client.organizationId}/${url}`;
      const j = await fetch(r);
      const pro = (await j.json()) as Product[];
      const s = pro;
      return s.filter((x) => x.categoryId != "W_TafE5SPs");
    } else {
      const r = `${client.llampukaqPro}/v1/organization/${client.organizationId}/${url}`;
      const j = await fetch(r);

      return await j.json();
    }
  }
};

export interface Translate {
  es: string;
  en: string;
}

export interface Product {
  title: string;
  description: string;
  productId: string;
  categoryId: string;
  organizationId: string;
  created: Date;
  cardId: string;
  grado: number;
  show: string;
  isPopular: string;
  top: number;
  oldPrice: number;
  variants: Variant[];
  recomended: string[];
  combo: string[];
}
export interface Variant {
  name: string;
  price: string;
  img: Img;
  volume: number;
  weight: number;
}

export interface Category {
  title: string;
  categoryId: string;
  organizationId: string;
  created: Date;
  cardId: string;
  img: Img;
  position: number;
}
export interface Img {
  name: string;
  id: string;
  size: any;
  src: string;
}

export interface Cards {
  title: { es: string; en: string };
  cardId: string;
  organizationId: string;
  created: Date;
}

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

export const format = (text?: string) => {
  // Proporciona un valor por defecto de cadena vacía si 'text' es 'undefined'
  const safeText = text ?? "";

  // Reemplaza los espacios por guiones y convierte a minúsculas
  const res = safeText.replace(/ /g, "-").toLowerCase();

  // Normaliza el texto para eliminar los acentos y diacríticos
  return res.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
