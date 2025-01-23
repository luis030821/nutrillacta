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
// import useDetectBackNavigation from "@/hooks/useDetectBackNavigation";
import Img from "../img/Img";
import OldModal from "./OldModal";
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
function Modal({
  children,
  modal,
  title,
  full = true,
  onlyChildren,
  showBottom = true,
  maxH = false,
  oldModal = false,
  on,
}: {
  on?: any;
  children?: ReactNode | r;
  className?: string;
  modal: modal;
  title: string;
  full?: boolean;
  delete?: boolean;
  onlyChildren?: boolean;
  showBottom?: boolean;
  oldModal?: boolean;
  maxH?: boolean;
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    toggleModal();
  }, [modal.value]);

  const toggleModal = () => {
    if (modal.value) {
      document.body.classList.add("overflow-y-hidden");
      document.body.classList.remove("overflow-y-scroll");
    }
    if (!modal.value) {
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.add("overflow-y-scroll");
    }
  };

  useOnClickOutside(modalRef, () => {
    document.body.classList.remove("overflow-y-hidden");
    document.body.classList.add("overflow-y-scroll");
    modal.close();
  });

  // useDetectBackNavigation(handleBackNavigation, modal.value);
  if (oldModal)
    return (
      <OldModal
        onlyChildren={onlyChildren}
        showBottom={showBottom}
        modal={modal}
        title={title}
      >
        {children}
      </OldModal>
    );
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
              ? `w-11/12 max-w-[850px] lg:max-w-[1200px] mt-[-30px] max-h-[70%] lg:max-h-[90%] lg:h-full  rounded-[10px] border`
              : "w-full h-full"
          } ${maxH ? "h-full" : ""} ${
            onlyChildren
              ? "border-none"
              : `bg-white  space-y-1 overflow-y-auto  border-[#e0e0e0]`
          }   `}
        >
          {onlyChildren ? (
            <></>
          ) : (
            <>
              {true && (
                <div className="bg-white w-full sticky top-0 z-[99]">
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
                      className="rounded-full logo min-h-[56px] max-h-[56px] lg:max-h-[64px] "
                      alt="logo"
                    />
                  </div>{" "}
                </div>
              )}
            </>
          )}

          {onlyChildren ? (
            <>{children}</>
          ) : (
            <>
              <div className="px-3  text-gray-700">
                <div className="flex items-center justify-center w-full h-calc(100%_-_150px) ">
                  <div className=" p-3 rounded-[10px] max-w-[770px] lg:max-w-full w-full lg:-mt-4">
                    <h2 className="font-medium mb-3 text-gray-700 text-[1.1rem] lg:text-[1.3rem]">
                      {title}
                    </h2>
                    {typeof children == "function" ? (
                      <>{children(modal)}</>
                    ) : (
                      <>{children}</>
                    )}
                  </div>
                </div>
              </div>
              {showBottom && (
                <div className="flex justify-end gap-2 items-center pt-4  border-t rounded-b border-gray-300">
                  <button
                    onClick={() => modal.close()}
                    data-modal-hide="static-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   dark:border-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      on?.();
                      modal.close();
                    }}
                    data-modal-hide="static-modal"
                    type="button"
                    className="text-white bg-paleta-100 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 text-center "
                  >
                    Entendido
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default Modal;
