import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { modal, useModal } from "./modal/OldModal";
import Modal from "./modal/Modal";

type r = (e: modal) => void;
function ModalTrigger({
  children,
  trigger: tr,
  full = false,
  title,
  forceRerendering,
}: {
  children?: ReactNode | r;
  trigger?: ReactNode;
  full?: boolean;
  title: string;
  forceRerendering?: any;
}) {
  const modal = useModal();

  // Se actualiza solo el trigger cuando forceRerendering cambia
  const [trigger, setTrigger] = useState(tr);
  useEffect(() => {
    setTrigger(tr);
  }, [tr, forceRerendering]);

  return (
    <>
      <div onClick={modal.open}>{trigger}</div>
      <Modal full={full} title={title} modal={modal}>
        {/* @ts-ignore */}
        {typeof children === "function" ? children(modal) : children}
      </Modal>
    </>
  );
}

export default ModalTrigger;
