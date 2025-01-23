import Modal, { useModal } from "@/components/modal/Modal";
import ModalLogin from "@/components/modal/ModalLogin";
import { useIsLogin } from "@llampukaq/realm";
import React, { useEffect } from "react";

function ModalSignin() {
  const modalLogin = useModal();
  const { isLogin } = useIsLogin();
  useEffect(() => {
    if (isLogin === false) {
      modalLogin.open();
    } else {
      modalLogin.close();
    }
  }, [isLogin]);
  return (
    <>
      {/* {isLogin === false && (
        <div
          onClick={() => modalLogin.open()}
          className="fixed bottom-12 text-white p-3 mx-auto w-[99%] left-[2px] z-[1] flex-col border rounded-xl bg-paleta-100 font-medium flex items-center justify-center"
        >
          <p className="">No podrás agregar esta dirección sino te registras</p>
          <p className="font-bold underline">Inicia sesión ahora</p>
        </div>
      )} */}
      <Modal showBottom={false} onlyChildren={true} modal={modalLogin} title="">
        <ModalLogin />
      </Modal>
    </>
  );
}

export default ModalSignin;
