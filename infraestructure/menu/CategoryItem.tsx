import Img from "@/components/img/Img";
import SourceImg from "@/components/img/SourceImg";
import React, { useEffect, useRef, useState } from "react";

interface CategoryItemProps {
  data: any;
  index: number;
  eventoDeClickEnCategoria: (data: any) => void;
  clicked: string;
  onPc: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  data,
  index,
  eventoDeClickEnCategoria,
  clicked,
  onPc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const inView =
        rect.top <
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0;
      setIsVisible(inView);
    }
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // Verificar la visibilidad inicial

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    if (isVisible) {
    } else {
    }
  }, [isVisible, index]);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        eventoDeClickEnCategoria(data);
      }}
      className="flex flex-col justify-center flex-shrink-0 cursor-pointer"
      key={index}
    >
      {!onPc && (
        <div className="aspect-square relative rounded-full w-full max-w-[70px] lg:max-w-[120px] items-center justify-center flex flex-col py-1 overflow-hidden">
          <picture>
            <SourceImg breaking="md" width="200" />
            <Img
              link
              width={onPc ? "200" : "100"}
              className={`rounded-full w-[68px] h-[68px] lg:w-[120px] lg:h-[120px] ${
                data.categoryId === clicked ? "border-2 border-paleta-100" : ""
              }`}
              alt={`${data.title} categoria en Nutrillacta`}
              src={data?.img?.src}
            />
          </picture>
        </div>
      )}

      <p
        className={`text-[.85rem] lg:text-[1.3rem] text-center capitalize ${
          data.categoryId === clicked ? "font-bold" : ""
        }`}
      >
        {data?.title}
      </p>
    </div>
  );
};

export default CategoryItem;
