import React, { useState } from "react";
import { GifProps } from "../types/types";

const Gif = ({ images }: GifProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <video
      className={`grid-item video ${loaded && "loaded"}`}
      autoPlay
      loop
      src={images.original.mp4}
      onLoadedData={() => setLoaded(true)}
    />
  );
};

export default Gif;
