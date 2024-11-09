import React, { useState } from "react";
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
  const [imageSource, setImageSource] = useState(source || fallbackSource);

  return (
    <Image
      source={imageSource}
      style={style}
      onError={() => {
        if (fallbackSource) {
          setImageSource(fallbackSource);
        }
      }}
    />
  );
}
