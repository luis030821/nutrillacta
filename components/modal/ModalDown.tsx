import React, { ReactNode, useRef, useState } from "react";

import { CSSTransition } from "react-transition-group";
import { Icons } from "@llampukaq/icons";
import { modal } from "../modal/Modal";

import { useOnClickOutside } from "usehooks-ts";

function ModalDown({
  modal,
  children,
}: {
  modal: modal;
  children?: ReactNode;
}) {
  const [isOpen1, setIsOpen1] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setIsOpen1(false);
  });
  return (
    <CSSTransition
      in={modal.value}
      timeout={300}
      onEnter={() => {
        setIsOpen1(true);
      }}
      classNames={"modaldown-background"}
      unmountOnExit
    >
      <>
        <div className="h-screen w-screen fixed top-0 backdrop-blur-sm z-[1999]">
          <CSSTransition
            in={isOpen1}
            timeout={300}
            classNames={"modaldown-content"}
            onExit={() => {
              modal.close();
            }}
            unmountOnExit
          >
            <div
              ref={ref}
              className=" fixed w-full left-0 bottom-0  bg-paleta-300 rounded-t-3xl space-y-3 modal-content "
            >
              <div className="flex justify-between items-center bg-paleta-600 px-5 py-3 rounded-t-3xl">
                <h1 className="font-bold text-[1.2rem] text-paleta-900">
                  Finalizar compra
                </h1>
                <div
                  onClick={() => {
                    setIsOpen1(false);
                  }}
                >
                  <Icons size={30} icon="IconX" />
                </div>
              </div>
              {/* @ts-ignore */}
              <div className="px-5 pb-3">{React.cloneElement(children, { modal })}</div>
            </div>
          </CSSTransition>
        </div>
      </>
    </CSSTransition>
  );
}

export default ModalDown;
