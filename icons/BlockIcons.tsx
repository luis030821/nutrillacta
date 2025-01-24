import React, { useState, useEffect } from "react";
import { icons } from "./data";
import { Icons } from ".";

function ScrollComponents({
  onSelect,
}: {
  onSelect: (s: string | undefined) => void;
}) {
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState<string>();
  const [data, setData] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const iconsPerPage = 100;
  useEffect(() => {
    onSelect?.(select);
  }, [select]);
  // Función para cargar más íconos
  const loadMoreIcons = () => {
    // Calcular el índice de inicio y fin para los íconos de la siguiente página
    const startIndex = (page - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;

    // Obtener los íconos para la siguiente página
    const nextPageIcons = icons.slice(startIndex, endIndex);

    // Actualizar el estado de la página y agregar los nuevos íconos a los datos existentes
    setPage(page + 1);
    setData([...data, ...nextPageIcons]);
  };

  // Efecto para cargar íconos cuando el componente se monta
  useEffect(() => {
    loadMoreIcons();
  }, []);

  // Efecto para agregar el listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreIcons();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, data]);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (event: any) => {
    const newSearchTerm = event.target.value;
    if (newSearchTerm == "") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
      // Realizar la búsqueda o solicitud aquí con el término de búsqueda actual
      const newFilteredIcons = icons
        .filter((icon) =>
          icon.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
        .slice(0, 20);
      //@ts-ignore
      setFilteredIcons(newFilteredIcons);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar icono"
        onChange={handleSearchChange}
      />
      <div className="flex flex-wrap">
        {isSearch
          ? filteredIcons.map((icon, index) => (
              <div
                onClick={() => {
                  setSelect(icon);
                }}
              >
                <Icons size={100} icon={icon} key={index} />
                <h1>{icon}</h1>
              </div>
            ))
          : data.map((icon, index) => (
              <div
                onClick={() => {
                  setSelect(icon);
                }}
              >
                {/* @ts-ignore */}
                <Icons size={100} icon={icon} key={index} />
                <h1>{icon}</h1>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ScrollComponents;
