import React, { useEffect, useState } from "react";
import { UseFormRegister, useForm, useFormContext } from "react-hook-form";

interface CustomInputProps {
  title: string;
  placeholder: string;
  isTextarea?: boolean;
  reg?: string | undefined;
  place?: boolean;
  askFor?: boolean;
  register?: any;
  setValue?: any;
}

type ChildInputProps = {
  title?: string;
  placeholder?: string;
  isTextarea?: false;
  reg?: string;
  place?: boolean;
  askFor?: boolean;
  register?: any;
  setValue?: any;
};

const CustomInput: React.FC<ChildInputProps> = ({
  title,
  placeholder,
  isTextarea = false,
  reg,
  place,
  askFor,
  register,
  setValue,
}) => {
  const [nombres, setnombres] = useState<any[]>();
  const listPlaces = ["Casa 1", "Departamento", "Conjunto 2"];
  const nombres_ = [
    "Ana",
    "Luis",
    "Carlos",
    "Marta",
    "Juan",
    "Sofía",
    "Pedro",
    "Lucía",
  ];
  const [value, setvalue] = useState("");
  useEffect(() => {
    if (!askFor) return;
    const obtenerCuatroNombresAleatorios = (nombres: any[]) => {
      // Crear una copia del array y mezclarlo
      const nombresMezclados = nombres.slice().sort(() => 0.5 - Math.random());

      // Devuelve los primeros 4 nombres del array mezclado
      return nombresMezclados.slice(0, 4);
    };
    setnombres(obtenerCuatroNombresAleatorios(nombres_));
  }, []);

  const aditional = () => {
    if (reg == "reference") {
      return {
        pattern: {
          value: /\b[a-zA-Z]{2,}\b.*\b[a-zA-Z]{3,}\b/,
          message: "La referencia debe ser clara",
        },
        required: {
          value: true,
          message: "El campo es requerido",
        },
      };
    } else if (reg == "who") {
      return {
        pattern: {
          value: /[a-zA-Z]{3}/,
          message: "Pon un nombre correcto de al menos 3 letras",
        },
        required: {
          value: true,
          message: "El campo es requerido",
        },
      };
    } else if (reg == "name") {
      return {
        pattern: {
          value: /[a-zA-Z]{4}/,
          message: "Al menos 4 letras",
        },
        required: {
          value: true,
          message: "El campo es requerido",
        },
      };
    } else if (reg == "email")
      return {
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Debes poner un correo válido",
        },
        required: {
          value: true,
          message: "El campo es requerido",
        },
      };
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-[1rem] font-semibold text-gray-700">
        {title}
      </label>
      {isTextarea ? (
        <textarea
          {...register(reg, {
            required: true,
          })}
          placeholder={placeholder}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-transparent shadow-sm"
          rows={4}
        ></textarea>
      ) : (
        <input
          {...register(reg, {
            required: true,
            ...aditional(),
          })}
          type={`${reg == "email" ? "email" : "text"}`}
          placeholder={placeholder}
          defaultValue={value}
          className="px-4 py-2 border placeholder:text-gray-300 text-gray-700 text-[.9rem] rounded-lg focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      )}
      {place && (
        <div className="flex gap-2 mt-2">
          {listPlaces.map((e) => (
            <span
              onClick={() => setValue(reg, e)}
              className="px-3 py-1 border border-gray-200 text-gray-500 rounded-[6px] text-[.8rem]"
            >
              {e}
            </span>
          ))}
        </div>
      )}
      {askFor && (
        <div className="flex gap-2 mt-2">
          {nombres?.map((e) => (
            <span
              onClick={() => setValue(reg, e)}
              className="px-3 py-1 border border-gray-200 text-gray-500 rounded-[6px] text-[.8rem]"
            >
              {e}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
