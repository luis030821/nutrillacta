import React, { useRef, useState } from "react";

interface ZoomableImageProps {
  children: React.ReactNode;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastTouchMove, setLastTouchMove] = useState<{
    clientX: number;
    clientY: number;
  } | null>(null);
  const [originalTransform, setOriginalTransform] = useState<
    string | undefined
  >();

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setLastTouchMove({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
    } else if (e.touches.length === 2) {
      setOriginalTransform(containerRef.current?.style.transform);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && lastTouchMove) {
      const deltaX = e.touches[0].clientX - lastTouchMove.clientX;
      const deltaY = e.touches[0].clientY - lastTouchMove.clientY;
      const container = containerRef.current;
      if (container) {
        container.scrollLeft -= deltaX;
        container.scrollTop -= deltaY;
        setLastTouchMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
      }
    } else if (e.touches.length === 2) {
      e.preventDefault(); // Evita el zoom predeterminado del navegador
    }
  };

  const handleTouchEnd = () => {
    // if (originalTransform !== undefined) {
    //   containerRef.current!.style.transition = 'transform 0.4s ease-in-out';
    //   containerRef.current!.style.transform = `scale(1)`;
    // }
    containerRef.current!.style.transition = "transform 0.4s ease-in-out";
    containerRef.current!.style.transform = `scale(1)`;
    setLastTouchMove(null);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        overflow: "auto",
        touchAction: "none",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default ZoomableImage;
