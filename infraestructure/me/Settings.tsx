import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { ICONS, Icons } from "@/icons";
const settingsContext = createContext({});
const useSettingsContext = () => {
  return useContext(settingsContext) as {
    main: "main" | "second";
    setMain: React.Dispatch<React.SetStateAction<"main" | "second">>;
    setC: React.Dispatch<React.SetStateAction<ReactNode>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };
};
function Settings({ children }: { children: ReactNode }) {
  const [main, setMain] = useState<"main" | "second">("main");
  const div = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState();
  const [c, setC] = useState();
  const scrollToRef = () => {
    // if (div.current) {
    //   div.current.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
    if (div.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <settingsContext.Provider
      value={{ setMain, title, c, setTitle, setC, scrollToRef }}
    >
      <div
        ref={div}
        className="max-w-[440px] h-max mx-auto space-y-5 overflow-x-hidden duration-300"
      >
        <div
          style={{
            transition: "500ms",
            position: "relative",
            left: main == "main" ? "0px" : `-${div.current?.clientWidth}px`,
          }}
          className="flex"
        >
          <div className="flex-shrink-0 w-full space-y-5 h-max overflow-auto">
            {children}
          </div>
          <div className="flex-shrink-0 w-full relative">
            <PrintSecond />
          </div>
        </div>
      </div>
    </settingsContext.Provider>
  );
}

const SettingsContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div>
      <div className="w-12/12 mx-auto mb-4">
        <h1 className="">{title}</h1>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
const SettingsItem = ({
  children,
  icon = "Icon123",
  title,
  description,
}: {
  children: any;
  icon: ICONS;
  title: string;
  description: string;
}) => {
  const { setMain, setC, setTitle, scrollToRef } = useSettingsContext() as any;
  const router = useRouter();
  const formatText = (text?: string) => {
    const res = text?.replace(/ /g, "").toLowerCase();
    return res?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const { asPath } = useRouter();
  useEffect(() => {
    if (asPath.includes(`#${formatText(title)}`)) {
      setTitle(title);
      setC(children);
      setMain("second");
    }
  }, []);
  return (
    <>
      <div
        onClick={() => {
          scrollToRef();
          router.push(`#${formatText(title)}`);
          setTitle(title);
          setC(children);
          setMain("second");
        }}
        className="flex justify-between items-center gap-4 shadow-sm border border-[#e0e0e0]   p-4 rounded-[10px]"
      >
        <div className="flex items-center gap-[10px]">
          <div className="w-12 h-12 flex items-center justify-center">
            <Icons size={32} className="stroke-paleta-100 " icon={icon}></Icons>
          </div>
          <div>
            <h1>{title}</h1>
            <p className="text-[.8rem] text-paleta-900/80">{description}</p>
          </div>
        </div>

        <div className="enter">
          <Icons
            size={30}
            className="stroke-paleta-100"
            icon="IconChevronRight"
          />
        </div>
      </div>
    </>
  );
};
export { Settings, SettingsContainer, SettingsItem };
const PrintSecond = () => {
  const { setMain, title, c } = useSettingsContext() as any;
  const router = useRouter();

  return (
    <div className="w-11/12 mx-auto">
      <div
        className="flex items-center space-x-5 pb-3"
        onClick={() => {
          router.push("#main");
          setMain("main");
        }}
      >
        <Icons
          className="stroke-paleta-100"
          size={30}
          icon="IconChevronLeft"
        ></Icons>
        <h1>{title ?? "Atras"}</h1>
      </div>
      <div className="relative">{c}</div>
    </div>
  );
};
