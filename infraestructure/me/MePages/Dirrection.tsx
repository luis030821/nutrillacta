import Button from "@/components/button/Button";
import { DirrecionMapa } from "@/components/confirmar_compra/MapaForm";
import Mapa, { MapPrint } from "@/components/map/Map";
import Modal, { modal, useModal } from "@/components/modal/Modal";
import useAddress from "@/hooks/useAddress";
import { useUserAddress } from "@/hooks/useAddressUser";
import { Address } from "@/interface";
import { Icons } from "@/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreateMeAddress from "./Dirrection/CreateMeAddress";

function Dirrection() {
  const modalCreate = useModal();
  const modalDelete = useModal();
  const modalUpdate = useModal();
  const [selectedDeleteId, setSeletedDeleteId] = useState<string>();
  const [selectedId, setSeletedId] = useState<string>();
  const { deleteAddress } = useAddress();
  const { address } = useUserAddress();
  return (
    <div className="space-y-5">
      <p>Para actualizar una dirección, eliminala y vuelvela a crear</p>
      {address?.map((adresss) => (
        <div className="shadow-xl border border-[#e0e0e0] rounded-xl px-4 py-3 text-gray-700">
          <p className="text-center mb-2  font-medium text-[1.1rem]">
            {adresss.name}
          </p>
          <div className="flex justify-between items-center text-[.9rem]">
            <div className="flex flex-col gap-1">
              <p>
                <strong>Celular:</strong> {adresss.phone}
              </p>
              <p>
                <strong>Reference:</strong>
                {adresss.reference}
              </p>
            </div>
          </div>
          <div className="w-full h-40 my-2 mb-3">
            <MapPrint position={adresss.map} />
          </div>
          <div className="flex justify-around text-white">
            <div
              onClick={() => {
                setSeletedDeleteId(adresss.addressId);
                modalDelete.open();
              }}
              className="p-2 rounded-[6px] px-5 bg-red-500 flex gap-2"
            >
              <Icons className="stroke-white" icon="IconTrash"></Icons>
              Eliminar
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={modalCreate.open}
        className={`shrink-0 border-paleta-100 w-full bg-white text-paleta-900 border px-2 h-20  rounded-xl flex justify-center items-center flex-col`}
      >
        <div className="border rounded-full p-1">
          <Icons
            size={16}
            className="stroke-paleta-100"
            icon="IconPlus"
          ></Icons>
        </div>

        <p className="thin-texto text-[.8rem] text-center text-paleta-100">
          Agregar nueva dirección
        </p>
      </button>

      <Modal modal={modalCreate} full title={"Crear Dirreciones"}>
        {/* <CreateMeAddress modal={modalCreate}/> */}
        <DirrecionMapa modal={modalCreate} />
      </Modal>
      <Modal modal={modalUpdate} full title={"Editar Dirreciones"}>
        <ModalEditDirection
          direction={address?.find((x) => x.addressId == selectedId)}
          modal={modalUpdate}
        />
      </Modal>
      <Modal modal={modalDelete} title={"Eliminar Dirreciones"}>
        <div className="flex justify-center">
          <Icons icon="IconTrash" size={160}></Icons>
        </div>
        <div className="flex justify-between">
          <Button secondary>Cancelar</Button>
          <Button
            onClick={async () => {
              //@ts-ignore
              await deleteAddress(selectedDeleteId);
              modalDelete.close();
            }}
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Dirrection;
export const ModalAddDirection = ({ modal }: { modal: modal }) => {
  return <DirrecionMapa modal={modal} />;
};
export const ModalEditDirection = ({
  modal,
  direction,
}: {
  modal: modal;
  direction: Address | undefined;
}) => {
  const { updateAddress } = useAddress();
  const { reset, register, handleSubmit } = useForm();
  const [map, setMap] = useState();
  const handleChange = async (r: any) => {
    modal.close();
    if (map != undefined) {
      const e = { direction, ...r, map };
      await updateAddress(direction?.addressId, e);
    } else {
      const e = { direction, ...r };
      await updateAddress(direction?.addressId, e);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(handleChange)(e);
          reset();
          modal.close();
        }}
        className="space-y-5 text-black"
      >
        <input
          defaultValue={direction?.name}
          placeholder="Nombre"
          {...register("name")}
          type="text"
        />
        <input
          defaultValue={direction?.phone}
          placeholder="Celular"
          {...register("phone")}
          type="number"
        />
        <input
          defaultValue={direction?.reference}
          placeholder="Referencia"
          {...register("reference")}
          type="text"
        />
        <div className="w-full h-40 block">
          <Mapa
            onClick={(e: any) => {
              setMap(e);
            }}
          />
        </div>
        <hr />
        <div className="flex pt-5 justify-between">
          <Button secondary type="button" onClick={modal.close}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </>
  );
};
