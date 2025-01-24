import { modal } from "@/components/modal/Modal";
import { ICONS, Icons } from "@/icons";
import { ReactNode } from "react";

export const TituloLlamativo = ({
  titulo,
  numero,
  icon,
  children,
  modal,
}: {
  titulo: string;
  numero: number;
  icon: ICONS;
  children: ReactNode;
  modal: modal;
}) => {
  return (
    <div className="relative h-max flex-col border-[1px]">
      <div className="flex  items-center w-full justify-between bg-paleta-200 border-b-[1px] border-black/10">
        <div className="flex gap-2 items-center pl-2 border-l-[3px] border-paleta-800">
          <p className="text-paleta-100 flex items-center justify-center w-8 h-8 font-bold  border-paleta-100 ">
            {numero}
          </p>
          <h2 className="text-gray-800 text-[1rem] font-medium">{titulo}</h2>
          <div>
            <Icons size={22} icon={icon}></Icons>
          </div>
        </div>
        <div
          onClick={() => modal.open()}
          className="font-bold text-[.9rem] shadow-md  rounded-full w-7 h-7 m-1 flex items-center justify-center text-paleta-900/80 "
        >
          <p>?</p>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};
