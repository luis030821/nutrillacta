import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from "react";
interface Img
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  width?: string;
  src?: any;
  alt?: string;
  link?: boolean;
  format?: "webp" | "png" | "aviff";
  q?: number;
  lazy?: boolean;
}
function Img({
  width = "1000",
  alt,
  src,
  q = 80,
  link,
  format = "webp",
  lazy = true,
  ...props
}: Img) {
  const [isLoaded, setisLoaded] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isLoaded)
  //     setisLoaded(false)
  //   }, 400);
  
  // }, [])


  
  return (
    <>
      <img
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        alt={alt ?? "Imagen-default"}
        onLoad={() => setisLoaded(true)}
        loading={`${lazy ? `lazy` : `eager`}`}
        className={`${props.className} relative`}
        src={
          link
            ? `https://wsrv.nl/?url=${src}&output=${format}&w=${width}&q=${q}`
            : src
        }
        {...props}
      ></img>
      {!isLoaded && (
        <div className="absolute w-full rounded-[12px] top-0 left-0 h-full bg-transparent animate-pulse flex items-center justify-center"></div>
      )}
    </>
  );
}

export default Img;
