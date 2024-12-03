import React, { useEffect, useState, useMemo } from "react";
import { Image, StyleProp, ImageStyle } from "react-native";

type ImageWithFallbackProps = {
  source: { uri?: string } | number;
  fallbackSource: any;
  style?: StyleProp<ImageStyle>;
};

const ImageWithFallback = React.memo(function ({
  source,
  fallbackSource,
  style,
}: ImageWithFallbackProps) {
  const [imageSource, setImageSource] = useState(fallbackSource);

  const stableSource = useMemo(() => source, [source]);
  const stableFallbackSource = useMemo(() => fallbackSource, [fallbackSource]);

  useEffect(() => {
    if (typeof stableSource === "object" && stableSource.uri) {
      if (!stableSource.uri.trim()) setImageSource(stableFallbackSource);
      else setImageSource(stableSource);
    } else if (typeof stableSource === "number") setImageSource(stableSource);
    else setImageSource(stableFallbackSource);
  }, [stableSource, stableFallbackSource]);

  return (
    <Image
      source={imageSource}
      style={style}
      onError={() => setImageSource(stableFallbackSource)}
    />
  );
});

export default ImageWithFallback;
