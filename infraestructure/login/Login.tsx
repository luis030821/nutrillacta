import Modal, { useModal } from "@/components/modal/Modal";
import Icons from "@/styles/Icons";
import { Icons as I } from "@llampukaq/icons";
import { useIsLogin } from "@llampukaq/realm";
// import { Icons } from "@llampukaq/icons";
import {
  RealmFacebookButton,
  RealmGoogleButton,
} from "@llampukaq/realm-google-provider";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import FormularioLogin from "./FormularioLogin";
type LoginContentProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setUsername?: Dispatch<SetStateAction<string>>;
  username?: string;
  password?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
};

export const LoginContent: React.FC<LoginContentProps> = ({
  handleSubmit,
  setUsername,
  username,
  password,
  setPassword,
}) => {
  const modalInfo = useModal();
  return (
    <>
      <Modal title="Iniciar sesión o registrarse" modal={modalInfo}>
        <div className="p-3 text-[.9rem] flex flex-col gap-4">
          <p>
            {" "}
            Ya sea para registrarte o iniciar sesión puedes continuar con un
            click a través de <strong>Facebook</strong> y{" "}
            <strong> Google</strong>. Si no posees niguna de esas puedes crear
            un cuenta con un correo tradicional.{" "}
            <span className="underline">Aquí.</span>
          </p>

          <p>
            Recuerda que para realizar una compra y tener beneficios dentro de
            la página debes estar registrado.
          </p>
        </div>
      </Modal>
      <form onSubmit={handleSubmit} className="">
        {/* <h1 className="text-[1.2rem] font-bold ">Inicia sesion o registrate</h1> */}
        <div className="mt-2 mb-5 w-full border" id="Otro metodos">
          {/* <div className="flex justify-between items-center">
            <h1 className=" text-[1.2rem] ">
              Registrate o inicia sesión
            </h1>
            <div
              onClick={() => modalInfo.open()}
              className="font-bold shadow-md  rounded-full w-8 h-8 flex items-center justify-center text-paleta-900/80 "
            >
              <p>?</p>
            </div>
          </div> */}

          <div className="flex flex-col justify-center mt-4 gap-2  w-full border">
            <FormularioLogin></FormularioLogin>
            <div className="overflow-hidden relative min-w-1/2 flex border  text-center w-full   text-black font-bold  cursor-pointer items-center justify-center">
              <div className=" bg-paleta-300 ">
                <RealmGoogleButton
                  appId="796273318621-kjo8r9aigtt0o0jhiv5bf1bvc9gtr747.apps.googleusercontent.com"
                  //@ts-ignore
                  googleOpt={{
                    useOneTap: true,
                    ux_mode: "popup",
                    shape: "pill",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mb-4 border-t-[1px]  border-[black/80] ">
        <label
          className="block text-gray-700 text-sm font-bold my-2 text-center"
          htmlFor="username"
        >
          Usuario
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Usuario"
          //   value={username}
          //   onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-center"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Contraseña"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-paleta-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar sesión
        </button>
      </div> */}
      </form>
    </>
  );
};
export default function Login() {
  const [usuarioLogeado, setusuarioLogeado] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
  };
  const { isLogin } = useIsLogin();
  const { push } = useRouter();
  const modalPromo = useModal();
  const goToUser = () => {
    push("/account");
  };

  return (
    <>
      <NextSeo
        title="Iniciar sesión en SPONDYLUS"
        description="Al resgistrarte en nuestra web entras a un programa que te beneficia con regalos en tus compras"
        canonical="https://spondylus.pages.dev/menu"
      />
      <>
        <Modal title="Restricciones de la promoción" modal={modalPromo}>
          <div className="p-3 text-[.9rem] flex flex-col gap-4">
            <p>
              Válido únicamente para usuarios nuevos. El envió gratis abarca
              hasta 4km a la redonda del parque central de Tumbaco. Si tu
              dirección sobrepasa este límite se cobrará una tarifa adicional.
            </p>

            <p>
              El valor mínimo de la compra debe ser <strong>$22.</strong>
            </p>
          </div>
        </Modal>
        {isLogin ? (
          <>{goToUser()}</>
        ) : (
          <div className="p-3">
            <h1 className="text-[1.4rem]">Bienvenido</h1>

            <div className="p-3 relative   gap-12 flex flex-col items-center justify-center ">
              <div className=" flex flex-col items-center justify-center">
                <div className=" rounded px-8 pt-6 pb-8 mb-4 ">
                  <LoginContent
                    handleSubmit={handleSubmit}
                    password={password}
                    setPassword={setPassword}
                    username={username}
                    setUsername={setUsername}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
