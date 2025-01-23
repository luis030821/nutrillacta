import { Product } from "@/services/url";
import React, { useState } from "react";

function FilterProducts({ products }: { products: Product[] }) {
  const [value, setValue] = useState<string>();
  const filteredProducts = products.filter((product) => {
    const formattedTitle = product.title.toLowerCase().replace(/\s/g, "");
    //@ts-ignore
    return formattedTitle.includes(value?.toLowerCase().replace(/\s/g, ""));
  });
  return <div>FilterProducts</div>;
}

export default FilterProducts;
