import Modal, { useModal } from "@/components/modal/Modal";
import useMessage from "@/context/message/useMessage";
import { RealmGoogleButton } from "@llampukaq/realm-google-provider";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Registrarse() {
  // Definir estados para los valores de los campos de entrada
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Funciones de control de cambios para manejar los cambios en los campos de entrada
  const handleUsernameOrEmailChange = (e: any) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  const router = useRouter();
  // Función para manejar el envío del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const modalInfoLogin = useModal();
  const { messagePromise } = useMessage();
  return (
    <div className="h-[calc(100vh_-_180px)] max-w-[500px] lg:mx-auto w-full flex items-center justify-center">
      <Modal
        oldModal
        title="Iniciar sesión o registrarse"
        modal={modalInfoLogin}
      >
        <div className="p-3 text-[.9rem] flex flex-col gap-4">
          <p>
            Ya sea para registrarte o iniciar sesión puedes continuar con un
            click a través de <strong> Google</strong>. Si no posees niguna de
            esas puedes crear una cuenta con un correo tradicional.
          </p>
          <p>
            Recuerda que para realizar una compra y tener beneficios dentro de
            la página debes estar registrado.
          </p>
        </div>
      </Modal>
      <div className="w-10/12 p-8 space-y-3 rounded-xl bg-white shadow-2xl text-gray-900 relative">
        <div
          onClick={() => modalInfoLogin.open()}
          className="absolute font-bold shadow-md z-[2] top-5 right-5  rounded-full w-8 h-8 flex items-center justify-center text-paleta-900/80 "
        >
          <p>?</p>
        </div>
        <h1 className="text-2xl font-bold text-center pb-12">Registrarse</h1>
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full">
            <input
              type="text"
              className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px] border-black/10 appearance-none  focus:border-paleta-200 focus:outline-none focus:ring-0  peer"
              placeholder=" "
              value={usernameOrEmail}
              onChange={handleUsernameOrEmailChange}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium px-2 absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Email
            </label>
          </div>
          <div className="space-y-1 text-sm">
            <div className="relative z-0 w-full">
              <input
                type="password"
                className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px] border-black/10  appearance-none  focus:border-paleta-200 focus:outline-none focus:ring-0  peer"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium px-2 absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Contraseña
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full">
            <input
              type="password"
              className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px] border-black/10 appearance-none  focus:border-paleta-200 focus:outline-none focus:ring-0  peer"
              placeholder=" "
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium px-2 absolute text-[15px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Confirmar contraseña
            </label>
          </div>
          <button className=" block w-full p-3 text-center rounded-sm text-paleta-300 bg-paleta-100">
            Registrarse
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Continuar proceso con Google
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          {/* <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button> */}
        </div>
        <div></div>
        <div className="flex justify-center space-x-4">
          <RealmGoogleButton
            onSuccess={(e) => {
              messagePromise(e, {
                error: "Error de inicio",
                pending: "Iniciando sesion",
                success: (function () {
                  return "Bienvenido";
                })(),
              });
            }}
            appId="796273318621-kjo8r9aigtt0o0jhiv5bf1bvc9gtr747.apps.googleusercontent.com"
            //@ts-ignore
            googleOpt={{
              useOneTap: true,
              ux_mode: "popup",
              shape: "pill",
            }}
          />
        </div>
        {/* <p className="text-xs text-center sm:px-6 text-gray-400">
          No tienes una cuenta todavía?
          <a
            rel="noopener noreferrer"
            href="#"
            className="underline text-gray-900"
          >
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
