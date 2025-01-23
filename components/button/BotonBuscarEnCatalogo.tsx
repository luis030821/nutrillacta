import { ChangeEvent, useEffect } from "react";
import Icons from "@/styles/Icons";
import { useState } from "react";
import { Icons as I } from "@llampukaq/icons";
import { BotonAgregarAlCarro } from "./BotonAgregarAlCarro";
import TarjetaProductoHorizontal from "../layout/TarjetaProductoHorizontal";
import { useData } from "@/context/withContext";
import { Category, Product, format } from "@/services/url";
export default function BotonBuscarEnCatalogo({
  fromNav = true,
}: {
  fromNav: boolean;
}) {
  const { products, categories } = useData();
  const [showInput, setshowInput] = useState(false);
  const [usedButton, setusedButton] = useState(false);
  const [value, setValue] = useState<string>("");
  const [is2nd, setis2nd] = useState(false);
  const [productAddedMenu, setproductAddedMenu] = useState<any[]>();
  const [idSecond, setidSecond] = useState("");

  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const specificDiv = document.getElementById("limite-titulo");
      if (specificDiv) {
        const { bottom } = specificDiv.getBoundingClientRect();

        if (bottom - 115 < 0) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const copyProducts = products;
    for (let index = 0; index < categories.length; index++) {
      //@ts-ignore
      copyProducts.push({
        title: `"` + categories[index].title + `" categoria`,
      });
    }
    setproductAddedMenu(copyProducts);
  }, []);

  // for (let index = 0; index < categories.length; index++) {
  //   //@ts-ignore
  //   productAddedMenu.push({ title: categories[index].title });
  // }

  const filteredProducts = productAddedMenu
    ?.filter((product) => {
      const formattedTitle = product.title
        .toLowerCase()
        .replace(/\s+|(.)\1+|["]/g, "$1");
      //@ts-ignore
      return formattedTitle.includes(
        value?.toLowerCase().replace(/\s+|(.)\1+|["]/g, "$1")
      );
    })
    .slice(0, 4);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setValue("");
      setusedButton(false);
    } else {
      setValue(e.target.value);
      if (e.target.value.split("").length === 0) {
        setusedButton(false);
      } else {
        setusedButton(true);
      }
    }
  };

  const clickSobreCerrarBusqueda = () => {
    setshowInput(false);
    setValue("");
    setusedButton(false);
  };

  const clickSobreProducto = (
    id: string | undefined,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!id) return;
    if (is2nd) {
      var m = document.getElementById(idSecond);
      if (m) {
        m.style.border = "1px solid #efefef";
      }
    }

    setTimeout(() => {
      const container = document.getElementById(id);
      if (container) {
        container.style.border = "3px dashed #fa6900";
        // Calculamos la posición del contenedor
        const { top } = container.getBoundingClientRect();
        // Calculamos el desplazamiento considerando el margen deseado
        const marginTop = 232; // Puedes ajustar este valor según tu preferencia
        window.scrollTo({
          top: window.scrollY + top - marginTop,
          behavior: "smooth",
        });
      }
      setValue("");
      setusedButton(false);
      setshowInput(false);
      setis2nd(true);
      setidSecond(id);
    }, 300);
  };

  return (
    <div
      style={{ zIndex: 12 }}
      className={`select-none mt-3  justify-end w-full max-w-[1200px] lg:mx-auto sticky top-[214px] left-0 z-[2] flex items-center `}
    >
      <div
        className={`${
          showInput ? "w-full px-3" : "max-w-max flex justify-end items-end"
        }`}
      >
        <div
          className={`input-buscar-boton relative bg-white h-12 p-3 rounded-full
         w-full mx-auto border-2 hover:border-paleta-100  flex  items-center space-x-2 `}
        >
          <div
            className={`" w-full h-12 flex justify-center gap-3  px-3  items-center rounded-full  `}
          >
            {" "}
            {usedButton && (
              <div
                onClick={() => clickSobreCerrarBusqueda()}
                className="w full h-full flex justify-center items-center  "
              >
                <div className="bg-paleta-900/30 rounded-full p-1">
                  <I
                    className="stroke-paleta-300 rotate-45 flex items-center"
                    icon="IconPlus"
                  ></I>
                </div>
              </div>
            )}
            {showInput && (
              <>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id={"input-buscar-menu"}
                  value={value}
                  placeholder="Busca tu bebida favorita"
                  type="text"
                  className="input-buscar-menu select-none  w-full outline-none bg-transparent  mr-2  "
                />
              </>
            )}{" "}
            <label
              onClick={() => setshowInput(!showInput)}
              htmlFor="input-buscar-menu"
            >
              {" "}
              <Icons icon="find" className="m-1 stroke-paleta-100 "></Icons>
            </label>
          </div>
          <>
            {value !== "" && (
              <div className="absolute left-0 w-[calc(100%_-_24px)]  top-[calc(100%_+_10px)] py-2 shadow-lg mt-2 rounded-[10px] bg-paleta-300 border border-paleta-900/20 z-[1] space-y-4 px-2">
                {filteredProducts !== undefined &&
                filteredProducts.length > 0 ? (
                  <div className="flex flex-col gap-3 px-4 py-2">
                    {filteredProducts.map((x, index) => {
                      if (x.show === "false") return;
                      return (
                        <div
                          onClick={(e) =>
                            clickSobreProducto(format(x?.title), e)
                          }
                        >
                          <p>{x.title}</p>
                        </div>
                        // <TarjetaProductoHorizontal product={x} index={index} />
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3">
                    <p>Al parecer no hay lo que buscas</p>
                  </div>
                )}
              </div>
            )}
          </>
        </div>{" "}
      </div>
    </div>
  );
}
