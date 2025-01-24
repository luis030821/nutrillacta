import React, { useEffect, useRef, useState } from "react";
import { IconsProps, useIcons } from ".";

function Icons({ size = 24, icon, className, stroke = 2 }: IconsProps) {
  const icons = useIcons();
  const svg = useSvgIcon(icon, size, stroke); // Usa el hook personalizado
  return (
    <div
      style={{ width: size }}
      className={`${className ?? icons?.className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg || "" }}
    />
  );
}
export default Icons;
function useSvgIcon(icon: string, size: number, stroke: number) {
  const [svg, setSvg] = useState<string | null>(null);
  const svgCache = useRef<{ [key: string]: string }>({});
  const svgUrl = `https://icons.llampukaq.com/${icon}.svg`;

  useEffect(() => {
    const fetchSvg = async () => {
      if (svgCache.current[icon]) {
        // Si el ícono ya está en la caché, usar el valor en lugar de hacer un fetch
        setSvg(svgCache.current[icon]);
        return;
      }

      try {
        const response = await fetch(svgUrl);
        const iconContent = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconContent, "image/svg+xml");
        const svgElement = svgDoc.querySelector(".icon");
        if (svgElement) {
          svgElement.setAttribute("width", size.toString());
          svgElement.setAttribute("height", size.toString());
          svgElement.setAttribute("stroke-width", stroke.toString());
          svgElement.removeAttribute("stroke");

          const svgString = svgElement.outerHTML;
          svgCache.current[icon] = svgString; // Guardar el SVG en la caché
          setSvg(svgString);
        }
      } catch (error) {
        console.error("Error fetching icon:", error);
      }
    };

    if (!svg) {
      fetchSvg();
    }
  }, [icon, size, stroke, svgUrl, svg]);

  return svg;
}
