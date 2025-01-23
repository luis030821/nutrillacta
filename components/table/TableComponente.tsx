import React from "react";

interface TableProps {
  columnas: string[];
  contenido: (string | number)[];
}

const TableComponent: React.FC<TableProps> = ({ columnas, contenido }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columnas.map((titulo, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {titulo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {contenido.map((fila, index) => (
                    <td
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td
                        key={index}
                        className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {fila}
                      </td>
                      {/* {fila.map((dato, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {dato}
                      </td>
                    ))} */}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
