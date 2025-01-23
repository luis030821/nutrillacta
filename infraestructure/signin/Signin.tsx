import Modal, { useModal } from "@/components/modal/Modal";
import useMessage from "@/context/message/useMessage";
import { RealmGoogleButton } from "@llampukaq/realm-google-provider";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Signin() {
  // Definir estados para los valores de los campos de entrada
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // Funciones de control de cambios para manejar los cambios en los campos de entrada
  const handleUsernameOrEmailChange = (e: any) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación o envío de datos
  };

  const modalInfoLogin = useModal();
  const { messagePromise } = useMessage();
  return (
    <>
      <NextSeo
        title="Iniciar sesión o registrarse | Nutrillacta"
        description="Al registrarte en nuestra plataforma, entras a un programa de beneficios diseñado para enriquecer tu experiencia de compra. ¿Qué esperas? Únete ahora."
      />
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
      <div className="lg:max-w-[400px] lg:mx-auto w-10/12 p-8 space-y-3 rounded-xl bg-white shadow-xl border text-gray-900 relative">
        <div
          onClick={modalInfoLogin.open}
          className="absolute font-bold shadow-md z-[2] top-5 right-5  rounded-full w-8 h-8 flex items-center justify-center text-paleta-900/80 "
        >
          <p>?</p>
        </div>
        <h1 className="text-2xl font-bold text-center pb-12">Iniciar sesión</h1>

        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full">
            <input
              type="text"
              className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px] border-paleta-300 appearance-none border-paleta-800/30 focus:border-blue-600/30 focus:outline-none focus:ring-0  peer"
              placeholder=" "
              value={usernameOrEmail}
              onChange={handleUsernameOrEmailChange}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium px-2 absolute text-[15px] paleta-800/30 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Nombre de usuario o email
            </label>
          </div>
          <div className="space-y-1 text-sm">
            <div className="relative z-0 w-full">
              <input
                type="password"
                className="block py-2.5 w-full px-3 bg-paleta-300 pb-3 rounded-[6px] text-sm text-gray-900 bg-transparent border-[1px]  appearance-none border-paleta-800/30 focus:border-blue-600/30 focus:outline-none focus:ring-0  peer"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium px-2 absolute text-[15px] paleta-800/30 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Contraseña
              </label>
            </div>
          </div>
          <button className=" block w-full p-3 text-center rounded-sm text-paleta-300 rouded-md bg-paleta-100">
            Iniciar sesión
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Ingresar con redes sociales
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <RealmGoogleButton
            onSuccess={(e) => {
              messagePromise(e, {
                error: "Error de inicio",
                pending: "Iniciando sesión...",
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
        <p className="text-xs text-center sm:px-6 text-gray-400">
          No tienes una cuenta todavía?{" "}
          <Link
            className="underline text-gray-900"
            rel="noopener noreferrer"
            href={"signup"}
          >
            Registrarse
          </Link>
        </p>
      </div>
    </>
  );
}
