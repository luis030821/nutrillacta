import Button from "@/components/button/Button";
import useMessage from "@/context/message/useMessage";
import useAddress from "@/hooks/useAddress";
import { Icons } from "@llampukaq/icons";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NombreYCelular from "./NombreYCelular";
import Modal, { modal } from "../modal/Modal";
import { useIsLogin } from "@llampukaq/realm";
import CustomInput from "../input/Input";
import ErrorInputMessages from "./ErrorInputMessages";
import { useAddressInfo } from "@/context/address/AddressContext";
import useMainContext from "@/context/useMainContext";
import { useModal } from "../modal/OldModal";
import Mapa from "../map/Map";
import { ModalPrecioEnvioEstimado } from "../modal/ModalPrecioEnvioEstimado";

interface PropLugar {
  name: string;
  price: string;
  coordenadas: [number, number];
  formated1: any;
}
type FormInputs = {
  phone: string;
  reference: string;
  who: string;
  name: string;
  email: string;
};

export const DirrecionMapa = ({
  modal,
  setmostrarFormularioMapaValidoSoloPc,
}: {
  modal?: modal;
  setmostrarFormularioMapaValidoSoloPc?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const { createAddress, createAddressAnonymous } = useAddress();
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
  const [map, setMap] = useState();
  const { onPc } = useMainContext();

  const { isLogin } = useIsLogin();
  const { setAddressInfo, addressInfo, updateLocation, selectedLocalidad } =
    useAddressInfo();
  const handleChange = async ({ email, ...data }: any) => {
    const e = { ...data, addressId: nanoid(10), map, ...wich };
    if (isLogin) {
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
    }
    if (!isLogin) {
      messagePromise(
        async () => {
          if (onPc && setmostrarFormularioMapaValidoSoloPc) {
            setmostrarFormularioMapaValidoSoloPc(false);
          } else {
            modal?.close();
          }

          //@ts-ignore
          setAddressInfo((x) => [...x, { email, ...e }]);
          await createAddressAnonymous(email, e);
        },
        {
          error: "Ha ocurrido un error al agregar la dirección.",
          pending: "Agregando la dirección...",
          success: "Dirección agregada correctamente.",
        }
      );
    }
  };
  const cerrarTeclado = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };
  const [wich, setwich] = useState<PropLugar>();
  const modalMap = useModal();
  useEffect(() => {
    handleLocalidadChange(selectedLocalidad);
  }, []);

  const handleLocalidadChange = (localidad: any) => {
    if (wich) {
      setwich(undefined);
    }

    updateLocation(localidad);
    setwich(localidad);
  };
  const modalDelete = useModal();
  const handleUpdateLocationSee = (newLocation: PropLugar) => {
    modalDelete.open();
    setlocationSee(newLocation);
  };
  const [locationSee, setlocationSee] = useState<PropLugar | undefined>();
  const [updateLocal, setupdate] = useState(false);

  return (
    <div className="w-full lg:pl-6  lg:pr-2">
      <Modal
        modal={modalDelete}
        full={!onPc}
        showBottom={false}
        //@ts-ignre
        title={locationSee?.formated1 ? locationSee?.formated1 : ""}
      >
        <p className="text-[.9rem] lg:text-[1.2rem] text-gray-600">
          Únicamente puedes ver o eliminar esta dirección, no puedes editarla.
        </p>
        <div className="flex gap-3 mb-5">
          <button
            className="mt-2  text-paleta-100 px-4 py-1 rounded-[5px] border-[1px] border-paleta-100"
            onClick={() => modalDelete.close()}
          >
            Regresar
          </button>
          <button
            className="mt-2  bg-paleta-100 px-4 py-1 rounded-[5px] text-white font-medium"
            onClick={() => {
              modalDelete.close();
            }}
          >
            Eliminar dirección
          </button>
        </div>
        <div className="h-80 text-[.8rem] text-gray-600">
          <Mapa
            onClick={() => {}}
            byUser
            lat={locationSee?.coordenadas[0]}
            lng={locationSee?.coordenadas[1]}
          />
        </div>
      </Modal>
      <div onTouchMove={cerrarTeclado} className=" w-full"></div>
      <>
        {
          <>
            <div className="w-[89%]">
              <p>
                ¿Deseas usar alguna de las coordeandas de mapa que tienes
                guardadas?
              </p>
              <p className="relative text-gray-600 text-[.9rem] w-full">
                {addressInfo
                  //@ts-ignore
                  ?.filter((x) => x?.name == undefined)
                  ?.map((localidad, index) => (
                    <span
                      onClick={() => {
                        updateLocation(localidad);
                      }}
                      key={index}
                      className="mt-1 w-full p-2 border-2 border-black/10  flex flex-row items-center rounded-md space-x-5"
                    >
                      <div>
                        {selectedLocalidad.formated1 ==
                          //@ts-ignore
                          localidad?.formated1 && (
                          <Icons
                            icon="IconCheck"
                            className="stroke-paleta-100"
                          ></Icons>
                        )}
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between w-full space-x-5">
                          <div>Precio de envio:</div>
                          {/* @ts-ignore */}
                          <div>${Number(localidad?.price)}</div>
                        </div>
                        <div className="flex justify-between w-full space-x-5">
                          <div>Ubicacion:</div>
                          {/* @ts-ignore */}
                          <div>{localidad?.formated1}</div>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          handleUpdateLocationSee(localidad);
                        }}
                      >
                        <Icons
                          icon="IconTrash"
                          className="stroke-paleta-100"
                        ></Icons>
                      </div>
                    </span>
                  ))}
              </p>
            </div>

            <div className="flex justify-center">
              <Button className="my-5 mx-auto" onClick={modalMap.open}>
                Agregar mapa
              </Button>
            </div>
            <Modal
              full={!onPc}
              showBottom={false}
              title="Estimar precio de envío"
              modal={modalMap}
            >
              <ModalPrecioEnvioEstimado
                update={updateLocal}
                setupdate={setupdate}
                wich={wich ?? undefined}
                modal={modalMap}
              />
            </Modal>
          </>
        }
      </>

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
                onPc
                  ? setmostrarFormularioMapaValidoSoloPc &&
                    setmostrarFormularioMapaValidoSoloPc(false)
                  : modal?.close();
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
};
