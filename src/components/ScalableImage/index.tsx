import React, {useState, useEffect, useRef, ElementType} from 'react';

import {
  Image,
  TouchableOpacity,
  ImageBackground,
  ImageProps,
} from 'react-native';

const resolveAssetSource = Image.resolveAssetSource;

interface IOnSizeParams {
  width: number;
  height: number;
}

interface PropsType extends ImageProps {
  height?: number;
  width?: number;
  background?: boolean;
  onPress?: () => void;
  onSize?: (onSizeParams: IOnSizeParams) => void;
}

const ScalableImage: React.FC<PropsType> = props => {
  const ImageComponent: ElementType = props.background
    ? ImageBackground
    : Image;

  const [scalableWidth, setScalableWidth] = useState<number>(null);
  const [scalableHeight, setScalableHeight] = useState<number>(null);
  const [image, setImage] = useState(<ImageComponent />);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    onProps(props);
  });

  useEffect(() => {
    setImage(
      <ImageComponent
        {...props}
        style={[
          props.style,
          {
            width: scalableWidth,
            height: scalableHeight,
          },
        ]}
      />,
    );
  }, [props, scalableHeight, scalableWidth]);

  const onProps = localProps => {
    const {source} = localProps;
    if (source.uri) {
      const sourceToUse = source.uri ? source.uri : source;

      Image.getSize(
        sourceToUse,
        (width, height) => adjustSize(width, height, props),
        err => console.warn(err),
      );
    } else {
      const sourceToUse = resolveAssetSource(source);
      adjustSize(sourceToUse.width, sourceToUse.height, props);
    }
  };

  const adjustSize = (sourceWidth, sourceHeight, localProps) => {
    const {width, height} = localProps;

    let ratio = 1;

    if (width && height) {
      ratio = Math.min(width / sourceWidth, height / sourceHeight);
    } else if (width) {
      ratio = width / sourceWidth;
    } else if (height) {
      ratio = height / sourceHeight;
    }

    if (mounted.current) {
      const computedWidth = sourceWidth * ratio;
      const computedHeight = sourceHeight * ratio;

      setScalableWidth(computedWidth);
      setScalableHeight(computedHeight);

      props.onSize({width: computedWidth, height: computedHeight});
    }
  };

  if (!props.onPress) {
    return image;
  } else {
    return <TouchableOpacity onPress={props.onPress}>{image}</TouchableOpacity>;
  }
};

ScalableImage.defaultProps = {
  background: false,
  onSize: size => {},
};

export default ScalableImage;
