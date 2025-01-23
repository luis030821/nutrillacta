import Login, { LoginContent } from "@/infraestructure/login/Login";
import Signin from "@/infraestructure/signin/Signin";
import React, { useState } from "react";

export default function ModalLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
  };
  return (
    <div className="flex items-center justify-center">
      <Signin />
    </div>
  );
}
