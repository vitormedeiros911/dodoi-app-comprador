import React, { useState, useEffect } from "react";
import { Image } from "react-native";

type ImageWithFallbackProps = {
  source: any;
  fallbackSource: any;
} & React.ComponentProps<typeof Image>;

export default function ImageWithFallback({
  source,
  fallbackSource,
  style,
}: ImageWithFallbackProps) {
  const [imageSource, setImageSource] = useState(source);

  useEffect(() => {
    if (!source) {
      setImageSource(fallbackSource);
    } else {
      setImageSource(source);
    }
  }, [source, fallbackSource]);

  return (
    <Image
      source={imageSource || fallbackSource}
      style={style}
      onError={() => {
        setImageSource(fallbackSource);
      }}
    />
  );
}
