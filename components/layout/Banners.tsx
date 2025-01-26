import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@/icons";
import Img from "../img/Img";
import { useData } from "@/context/withContext";

export interface Banner {
  img: string;

  show: boolean;
}

const Banners: React.FC = () => {
  const { images: banners } = useData();

  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const router = useRouter();
  const [paused, setPaused] = useState<boolean>(false);
  const [progressState, setprogress] = useState(100);
  const [isPedingTime, setisPedingTime] = useState(false);

  const intervaloEntreBanners = 5200;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth * banners?.length);
    }
    const pedienteIntervalor = () => {
      if (progressState <= 20) {
        setprogress(100);
        setisPedingTime(false);
        return intervaloEntreBanners;
      }

      let val = progressState * (intervaloEntreBanners / 100);

      setisPedingTime(true);

      return intervaloEntreBanners;
    };
    const intervalId = setInterval(() => {
      if (!paused) {
        setCurrentBannerIndex((prevIndex) =>
          prevIndex === banners?.length - 1 ? 0 : prevIndex + 1
        );
        setprogress(100);
      }
    }, pedienteIntervalor());

    intervalRef.current = intervalId;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const intervalIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!paused) {
      intervalIdRef.current = window.setInterval(() => {
        setprogress((prev) => prev - 1);
      }, intervaloEntreBanners / 100);

      return () => {
        if (intervalIdRef.current !== undefined) {
          clearInterval(intervalIdRef.current);
        }
      };
    } else {
      if (intervalIdRef.current !== undefined) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = undefined;
      }
    }
  }, [paused, intervaloEntreBanners]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.5s ease";
      containerRef.current.style.transform = `translateX(-${
        currentBannerIndex * containerRef.current.offsetWidth
      }px)`;
    }
  }, [currentBannerIndex]);

  const handleIndicatorClick = (index: number) => {
    setCurrentBannerIndex(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          setCurrentBannerIndex((prevIndex) =>
            prevIndex === banners.length - 1 ? 0 : prevIndex + 1
          );
        } else {
          setCurrentBannerIndex((prevIndex) =>
            prevIndex === 0 ? banners.length - 1 : prevIndex - 1
          );
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const togglePause = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  return (
    <div
      className="w-full mx-auto relative pb-4 min-h-[120px] px-2 max-w-[1200px]  lg:mx-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden rounded-[12px] border-[2px] border-black  relative flex w-full">
        <div className="flex w-max gap-[0px] relative" ref={containerRef}>
          {banners != undefined && (
            <>
              {banners?.map((banner, index) => {
                console.log(banner);
                return (
                  <Img
                    link
                    width="700"
                    key={index}
                    src={banner}
                    className="object-center w-full aspect-auto min-h-[150px] lg:w-full lg:min-h-[250px] lg:max-h-[250px] lg:min-w-[1200px] lg:max-w-[1200px]"
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="absolute top-[96%] left-0 right-0 flex justify-center gap-3">
        {banners?.map((_, ind) => (
          <div
            key={ind}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              ind === currentBannerIndex ? "bg-paleta-100" : "bg-black/10"
            }`}
            onClick={() => handleIndicatorClick(ind)}
          ></div>
        ))}
      </div>

      <button
        className="absolute bottom-7 right-5 z-[1] bg-white/90 rounded-full p-1  items-center flex justify-center"
        onClick={togglePause}
      >
        <div className="relative w-full h-full items-center flex justify-center">
          <div className="absolute">
            <svg width="42" height="42" className="-rotate-[90deg]">
              <circle
                className="stroke-paleta-200"
                r="14.7"
                cx="21"
                cy="21"
                fill="transparent"
                stroke-width="4.2"
                stroke-dasharray="100"
                stroke-dashoffset="0"
              ></circle>
              <circle
                className="stroke-paleta-100"
                r="14.7"
                cx="21"
                cy="21"
                fill="transparent"
                stroke-width="4.2"
                stroke-dasharray="100"
                stroke-dashoffset={progressState}
              ></circle>
            </svg>
          </div>
          {paused ? (
            <Icons
              icon={"IconPlayerPlay"}
              className="h-6 w-6 stroke-paleta-100"
            />
          ) : (
            <Icons
              icon={"IconPlayerPause"}
              className="h-6 w-6 stroke-paleta-100"
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default Banners;
