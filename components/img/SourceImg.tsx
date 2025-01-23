import React from "react";

export interface SourceImgProps
  extends React.DetailedHTMLProps<
    React.SourceHTMLAttributes<HTMLSourceElement>,
    HTMLSourceElement
  > {
  breaking: "sm" | "md" | "lg" | "xl" | "2xl";
  width?: string;
  link?: boolean;
  format?: "webp" | "png" | "aviff";
  q?: number;
}

const SourceImg: React.FC<SourceImgProps> = ({
  breaking,
  width,
  srcSet,
  q = 80,
  link,
  format = "webp",
  ...props
}) => {
  const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };
  const minWidth = breakpoints[breaking];
  return (
    <source
      srcSet={
        link
          ? `//wsrv.nl/?url=${srcSet}&output=${format}&w=${width}&q=${q}`
          : srcSet
      }
      {...props}
      media={`(min-width: ${minWidth})`}
    />
  );
};

export default SourceImg;
