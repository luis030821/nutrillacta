// src/components/GalleryComponent.tsx

import React, { useState } from "react";
import Modal, { useModal } from "../modal/Modal";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ImageZoom from "./ImageZoom";
import Img from "./Img";
import { Icons } from "@/icons";
import useMainContext from "@/context/useMainContext";

interface ImageProps {
  img: string;
  thumbnail: string;
  titulo: string;
  descripcion: string;
  tags: string[];
}

interface GalleryComponentProps {
  images: ImageProps[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ images }) => {
  const { onPc } = useMainContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [reset, setreset] = useState(false);

  const handleClose = () => {
    setSelectedIndex(null);
    modalGaleria.close();
  };
  const handleNext = () =>
    setSelectedIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : prev
    );
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

  const modalGaleria = useModal();

  const clickThumbnail = (index: number) => {
    setSelectedIndex(index);
    modalGaleria.open();
    setreset(!reset);
  };
  return (
    <div className="">
      <div className="grid grid-cols-2  gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => clickThumbnail(index)}
          >
            <Img
              link
              width={` ${onPc ? "550" : "350"}`}
              src={image.thumbnail}
              alt={image.titulo}
              className="w-full h-40 lg:h-[440px] object-cover rounded"
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded">
                +{images.length - 4} fotos
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        onlyChildren
        oldModal
        title="Fotos del local en Tumbaco"
        showBottom={false}
        modal={modalGaleria}
      >
        {selectedIndex !== null && (
          <div className="relative w-full bg-white rounded-lg p-4 ">
            {/* <div className="absolute w-full  flex justify-between">
              
              <button onClick={handlePrev} className="text-gray-700">
                &lt; Prev
              </button>
              <button onClick={handleNext} className="text-gray-700">
                Next &gt;
              </button>
            </div> */}
            <button
              onClick={handleClose}
              className="absolute z-[4] top-2 right-2 text-xl text-gray-700"
            >
              <div className="mx-auto pt-2 pr-2 flex w-full justify-center items-center">
                <Icons icon="IconX"></Icons>
              </div>
            </button>
            <div className="relative w-full flex justify-center items-center">
              <div className="absolute z-[5] bottom-0 flex gap-2 bg-paleta-200 border p-1 ">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => clickThumbnail(index)}
                  >
                    <Img
                      link
                      width="100"
                      src={image.thumbnail}
                      alt={image.titulo}
                      className={`${
                        selectedIndex === index
                          ? "border-2 border-paleta-100"
                          : ""
                      } w-full h-[40px] max-w-[40px] min-w-[40px] object-cover rounded border`}
                    />
                  </div>
                ))}
              </div>
              <TransformWrapper initialScale={1}>
                <TransformComponent>
                  <ImageZoom reset={reset}>
                    <Img
                      width="720"
                      src={images[selectedIndex].img}
                      alt={images[selectedIndex].titulo}
                      className="w-full h-[426px] lg:h-[580px] lg:w-full object-contain rounded"
                    />{" "}
                  </ImageZoom>
                </TransformComponent>
              </TransformWrapper>
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                {images[selectedIndex].titulo}
              </h2>
              <p className="mt-2">{images[selectedIndex].descripcion}</p>
              {/* <div className="mt-2 flex flex-wrap gap-2">
                {images[selectedIndex].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GalleryComponent;
