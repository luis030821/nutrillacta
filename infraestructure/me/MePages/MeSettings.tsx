import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { useModal } from "@/components/modal/OldModal";
import useMessage from "@/context/message/useMessage";
import { User } from "@/interface";
import { useUser } from "@llampukaq/realm";
import React, { useState } from "react";

function MeSettings() {
  const { user, updateUser } = useUser<User>();
  const modal = useModal();
  const [phone, setPhone] = useState();
  const [document, setDocument] = useState();
  const { messagePromise } = useMessage();
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h1>email:</h1>
        <p>{user?.email}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <h1>celular:</h1>
        <p>{user?.phone}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <h1>cedula:</h1>
        <p>{user?.document}</p>
      </div>
      <div className="flex justify-center my-5">
        <Button onClick={modal.open}>Actualizar datos</Button>
      </div>

      <Modal
        on={() => {
          messagePromise(
            async () => {
              await updateUser({ phone, document });
            },
            {
              error: "Error al actualzar",
              pending: "Actualizando datos...",
              success: "Datos Actualizados",
            }
          );
        }}
        title="Actualizar datos"
        modal={modal}
      >
        <div className="flex flex-col justify-center space-y-5">
          <input
            onChange={(e) => {
              //@ts-ignore
              setPhone(e.target.value);
            }}
            className="border p-2 rounded-xl"
            placeholder="Celular"
            type="tel"
          />
          <input
            onChange={(e) => {
              //@ts-ignore
              setDocument(e.target.value);
            }}
            className="border p-2 rounded-xl"
            placeholder="Cedula"
            type="tel"
          />
        </div>
      </Modal>
    </div>
  );
}

export default MeSettings;
