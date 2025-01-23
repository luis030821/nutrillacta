import React, { useEffect } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

export default function ImageZoom({
  children,
  reset,
}: {
  children: React.ReactNode;
  reset: boolean;
}) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  useEffect(() => {
    resetTransform();
  }, [reset]);

  return <>{children}</>;
}
