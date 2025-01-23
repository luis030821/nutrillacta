import Button from "@/components/button/Button";
import ErrorInputMessages from "@/components/confirmar_compra/ErrorInputMessages";
import NombreYCelular from "@/components/confirmar_compra/NombreYCelular";
import CustomInput from "@/components/input/Input";
import Mapa, { locale } from "@/components/map/Map";
import { modal } from "@/components/modal/Modal";
import useMessage from "@/context/message/useMessage";
import useAddress from "@/hooks/useAddress";
import { useIsLogin } from "@llampukaq/realm";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface PropLugar {
  name: string;
  price: string;
  coordenadas: [number, number];
}
type FormInputs = {
  phone: string;
  reference: string;
  who: string;
  name: string;
  email: string;
};
function CreateMeAddress({ modal }: { modal: modal }) {
  const { createAddress } = useAddress();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });
  const { messagePromise } = useMessage();
  const [map, setMap] = useState<locale>();
  const { isLogin } = useIsLogin();
  const handleChange = async ({ email, ...data }: any) => {
    const e = { ...data, addressId: nanoid(10), map };
    messagePromise(
      async () => {
        modal?.close();
        await createAddress(e);
      },
      {
        error: "Ha ocurrido un error al agregar la dirección.",
        pending: "Agregando la dirección...",
        success: "Dirección agregada correctamente.",
      }
    );
  };
  const cerrarTeclado = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };
  return (
    <div className="w-full lg:pl-6  lg:pr-2">
      <div onTouchMove={cerrarTeclado} className=" w-full"></div>
      <p className="text-[.9rem] lg:text-[1.05rem] mt-4">
        Vas agregar una nueva direccion con informacion de entrega.
      </p>
      <div className="aspect-video">
        <Mapa
          onClick={(e) => {
            setMap(e);
          }}
        />
      </div>

      <form onSubmit={handleSubmit(handleChange)} className=" text-black  ">
        <div className="w-full flex flex-col gap-2 py-2">
          <NombreYCelular setError={setError} register={register} />
          {errors.phone && errors.phone.types && (
            <ErrorInputMessages>{errors.phone.message}</ErrorInputMessages>
          )}

          <div className="relative z-0 w-full mt-3">
            <CustomInput
              register={register}
              reg="reference"
              placeholder="Ej: Casa de 2 pisos color rojo. Porton color cafe, etc..."
              title=" Referencia"
            />
            {errors.reference && (
              <ErrorInputMessages>
                {errors.reference.message}
              </ErrorInputMessages>
            )}
          </div>
          <div className="relative z-0 w-full mt-3">
            <CustomInput
              setValue={setValue}
              register={register}
              askFor
              reg="who"
              placeholder="Por quién debe preguntar el repartidor"
              title="Preguntar por"
            />
            {errors.who && (
              <ErrorInputMessages>{errors.who.message}</ErrorInputMessages>
            )}
          </div>
          <div className="relative z-0 w-full">
            <CustomInput
              setValue={setValue}
              register={register}
              place
              reg="name"
              placeholder="Ej: Casa, departamento "
              title="        Nombre de lugar"
            />
            {errors.name && (
              <ErrorInputMessages>{errors.name.message}</ErrorInputMessages>
            )}
          </div>
          {!isLogin && (
            <div className="relative z-0 w-full bg-blaze-orange-100 rounded-[6px] p-2">
              <p className="text-[.9rem] text-blaze-orange-500">
                ⚠️ Debido a que no estás registrado necesitamos tu correo para
                seguir con el pedido. Si te registras con Google, este segmento
                de correo electrónico no se mostrará
              </p>
              <CustomInput
                setValue={setValue}
                register={register}
                reg="email"
                placeholder="Ej: alguien123@ejemplo.com"
                title="Correo electrónico"
              />

              {errors.email && (
                <ErrorInputMessages>
                  {errors?.email?.message}
                </ErrorInputMessages>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 pr-2 mb-12">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                modal?.close();
              }}
              secondary
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar esta dirección</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateMeAddress;
