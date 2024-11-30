import React, { useState, useEffect } from "react";
import { Image } from "react-native";

type ImageWithFallbackProps = {
  source: { uri?: string } | number;
  fallbackSource: any;
  style?: any;
};

const ImageWithFallback = React.memo(function ({
  source,
  fallbackSource,
  style,
}: ImageWithFallbackProps) {
  const [imageSource, setImageSource] = useState(source);

  useEffect(() => {
    if (typeof source === "object" && source.uri) {
      if (!source.uri.trim()) {
        setImageSource(fallbackSource);
      } else {
        setImageSource(source);
      }
    } else if (typeof source === "number") {
      setImageSource(source);
    } else {
      setImageSource(fallbackSource);
    }
  }, [source, fallbackSource]);

  return (
    <Image
      source={imageSource}
      style={style}
      onError={() => {
        if (imageSource !== fallbackSource) setImageSource(fallbackSource);
      }}
    />
  );
});

export default ImageWithFallback;
