import client from "@/client";
import useSSE from "@/hooks/useSSE";
import React, { createContext, useEffect, useState } from "react";
export interface inventory {
  inventoryId: string;
  stock: string;
  min: number;
  productId: string;
  barcode: string;
  organizationId: string;
  priceProvider?: string;
}
//@ts-ignore
export const contextInventory = createContext();

function InventoryProvider({ children }: { children: any }) {
  const [inventory, setInventory] = useState<inventory[]>();

  const [inventorySync] = useSSE<inventory>(
    `${client.llampukaq}/v1/organization/dge90qe2iqbaxcu/inventory/sync`,
    "inventory"
  );
  const getInventories = async () => {
    const res = await fetch(
      `${client.llampukaq}/v1/organization/dge90qe2iqbaxcu/inventory`
    );
    const data = await res.json();

    setInventory(data);
  };
  // useEffect(() => {
  //   getInventories();
  // }, []);
  // useEffect(() => {
  //   setInventory((prev) =>
  //     prev?.map((x) =>
  //       x.inventoryId == inventorySync?.inventoryId ? inventorySync : x
  //     )
  //   );
  // }, [inventorySync]);
  return (
    <contextInventory.Provider value={{ inventory }}>
      {children}
    </contextInventory.Provider>
  );
}

export default InventoryProvider;
