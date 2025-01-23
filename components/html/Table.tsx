import React from "react";
import { PropLugarEstimado } from "../modal/ModalPrecioEnvioEstimado";
import { useAddressInfo } from "@/context/address/AddressContext";

interface TableProps {
  headers: string[];
  rows: { lugar: PropLugarEstimado; precio: string }[];
  onRowClick: (rowData: any) => void;
  handleUpdateLocationSee?: (newLocation: PropLugarEstimado) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  onRowClick,
  handleUpdateLocationSee,
}) => {
  const { setAddressId } = useAddressInfo();

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr className="text-left  text-sm lg:text-[.9rem] text-gray-600 tracking-wider">
          {headers.map((header, index) => (
            <th key={index} className="px-3 py-3 w-max">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onRowClick(row.lugar)}
          >
            <td className="px-3 py-4 whitespace-nowrap text-sm lg:text-[.96rem] text-black">
              {row?.lugar?.formated1?.slice(0, 26)}
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-sm lg:text-[.96rem] text-black">
              {row.lugar.price}
            </td>
            {!row.lugar.default && handleUpdateLocationSee && (
              <td
                onClick={() => {
                  //@ts-ignore
                  setAddressId(`${row.lugar?.addressId}`);
                  handleUpdateLocationSee(row.lugar);
                }}
                className="px-3 py-4 whitespace-nowrap text-sm lg:text-[.96rem] text-black"
              >
                Ver/eliminar
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
