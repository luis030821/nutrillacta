import React, { useContext } from "react";
import { contextInventory, inventory } from "./InventoryProvider";

function useInventory() {
  const { inventory } = useContext(contextInventory) as {
    inventory: inventory[];
  };
  return { inventory };
}

export default useInventory;
