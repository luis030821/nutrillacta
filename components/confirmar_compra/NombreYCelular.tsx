import Icons from "@/styles/Icons";
import { Icons as I } from "@llampukaq/icons";
import { kMaxLength } from "buffer";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface InfoUserForm {
  name?: string;
  numero?: number;
  onError?: boolean;
  setError?: any;
}

export default function NombreYCelular({
  info,
  register,
  setError,
}: {
  info?: InfoUserForm;
  register: any;
  setError?: any;
}) {
  const [phone, setPhone] = useState("");

  const [semierror, setsemierror] = useState(false);

  const {
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full flex justify-between gap-2 mt-3 mb-2">
      <div className="flex flex-col relative z-0 group w-full">
        <label className="mb-2 text-[1rem] font-semibold text-gray-700">
          Número
        </label>
        <div className="relative min-w-full flex flex-col items-center justify-center">
          <input
            {...register("phone", {
              required: {
                value: true,
                message: "El campo es requerido",
              },

              pattern: {
                value: /^09\d{0,8}$/,
                message:
                  "El número debe empezar con 09 y máximo tener 10 dígitos",
              },
            })}
            type="number"
            className={`w-full px-4 py-2 border placeholder:text-gray-300 text-gray-700 text-[.9rem] rounded-lg focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-transparent shadow-sm`}
            placeholder="Ej: 0987654321 "
            // value={phone}
            // onChange={handlePhoneChange}
            required
          />
          {!semierror && phone != "" && (
            <div className="flex gap-1items-center absolute right-2">
              <Icons className="w-5 h-5 fill-green-500" icon="check"></Icons>
              <p className="text-[.9rem]"></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
