import useMainContext from "@/context/useMainContext";
import React, { useState, useEffect } from "react";

interface Banner {
  img: string;
  link: string;
  show: boolean;
}

const Banners2: React.FC = () => {
  const { onPc } = useMainContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners: Banner[] = [
    {
      img: `https://www.licoreriaspondylus.com/assets/banners/${
        onPc ? "pc/direccion_banner.jpg" : "mobile/direccion_banner.jpg"
      }`,
      link: "/direccion",
      show: true,
    },
    {
      img: `https://www.licoreriaspondylus.com/assets/banners/${
        onPc ? "pc/abuelo_banner.jpg" : "mobile/abuelo_banner.jpg"
      }`,
      link: "/menu/combos/combo-ron-abuelo-7-anos-combo",
      show: true,
    },
    {
      img: `https://www.licoreriaspondylus.com/assets/banners/${
        onPc ? "pc/jaguer_banner.jpg" : "mobile/jaguer_banner.jpg"
      }`,
      link: "/menu/combos/combo-jagermeister-combo",
      show: true,
    },

    {
      img: `https://www.licoreriaspondylus.com/assets/banners/${
        onPc ? "pc/norteno_banner.jpg" : "mobile/norteno_banner.jpg"
      }`,
      link: "/menu/combos/combo-norteno-combo",
      show: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="min-h-[250px] relative w-full overflow-hidden max-w-[1200px] mx-auto lg:rounded-[11px]">
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <a href={banner.link} key={index} className="min-w-full">
              <img
                src={banner.img}
                alt={`Banner ${index}`}
                className="w-full"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="border-[3px] border-black/10 border-none max-w-[400px] w-max px-4 py-1 rounded-[12px] mx-auto  flex gap-2 pt-[-12px]">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
              currentIndex === index ? "bg-blaze-orange-950" : "bg-black/10"
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Banners2;
