import { CSSTransition } from "react-transition-group";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Icons } from "@llampukaq/icons";
import Img from "../img/Img";
export function useModal(initial: boolean = false) {
  const [modal, setModal] = useState<boolean>(initial);
  const open = useCallback(() => {
    setModal(true);
  }, []);
  const close = useCallback(() => {
    setModal(false);
  }, []);
  const toggle = useCallback(() => {
    setModal((state) => !state);
  }, []);
  return { open, close, value: modal, toggle };
}

export interface modal {
  value: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
type r = (e: any) => void;
function OldModal({
  children,
  modal,
  title,
  full = false,
  onlyChildren,
  showBottom = true,
  maxH = false,
}: {
  children?: ReactNode | r;
  className?: string;
  modal: modal;
  title: string;
  full?: boolean;
  delete?: boolean;
  onlyChildren?: boolean;
  showBottom?: boolean;

  maxH?: boolean;
}) {
  const startX = useRef(0);
  const modalRef = useRef(null);
  useEffect(() => {
    if (modal.value) {
      document.body.classList.add("overflow-y-hidden");
      document.body.classList.remove("overflow-y-scroll");
    }
    if (!modal.value) {
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.add("overflow-y-scroll");
    }
  }, [modal.value]);

  useOnClickOutside(modalRef, () => modal.close());
  // const handleBackNavigation = () => {
  //   alert("El usuario ha retrocedido en la navegación.");
  //   // Aquí puedes manejar la lógica adicional que necesites cuando el usuario navegue hacia atrás.
  // };

  // useDetectBackNavigation(handleBackNavigation, modal.value);

  return (
    <CSSTransition
      unmountOnExit
      in={modal.value}
      timeout={300}
      classNames={"modal-background"}
    >
      <div
        className={`h-screen w-full top-0  fixed  left-0 right-0 bottom-0 flex justify-center items-center md:pb-0 md:items-center bg-paleta-900/40  z-[2000] my-0`}
        style={{ marginTop: 0 }}
      >
        <div
          ref={modalRef}
          className={`${
            !full
              ? `w-11/12 max-w-[550px] mt-[-30px] max-h-[70%]  rounded-[10px] border`
              : "w-full h-full"
          } ${maxH ? "h-full" : ""} ${
            onlyChildren
              ? "border-none"
              : "bg-white space-y-1 overflow-y-auto p-3 border-[#e0e0e0]"
          }   `}
        >
          {onlyChildren ? (
            <></>
          ) : (
            <>
              <div className="bg-white w-full sticky top-0 z-[5]">
                <div
                  onClick={() => modal.close()}
                  id="Header"
                  className="max-w-max  flex gap-2 items-center p-4"
                >
                  <Icons icon="IconArrowLeft"></Icons>
                  <Img
                    link
                    width="500"
                    src="https://www.licoreriaspondylus.com/logoHorizontal.png"
                    className="rounded-full logo max-w-[150] min-h-[56px] max-h-[56px] "
                    alt="logo"
                  />
                </div>{" "}
              </div>
            </>
          )}

          {onlyChildren ? (
            <>{children}</>
          ) : (
            <div className="mb-4">
              <div className="px-3  text-gray-700 ">
                <h2 className="font-medium mb-3 text-gray-700 text-[1.1rem]">
                  {title}
                </h2>
                {typeof children == "function" ? (
                  <>{children(modal)}</>
                ) : (
                  <>{children}</>
                )}
              </div>
              {showBottom && (
                <div className="flex justify-end gap-2 items-center pt-4 mt-3  border-t rounded-b border-gray-300">
                  <button
                    onClick={() => modal.close()}
                    data-modal-hide="static-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   dark:border-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => modal.close()}
                    data-modal-hide="static-modal"
                    type="button"
                    className="text-white bg-paleta-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Entendido
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default OldModal;
