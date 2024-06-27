import React, { useState } from "react";

type GifProps = {
  images: {
    original: {
      mp4: string;
    };
  };
};

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
