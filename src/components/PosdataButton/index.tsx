import React from 'react';
import FlatButton from './FlatButton';
import GradientButton from './GradientButton';

interface Props {
  onPress?: () => void;
  title: string;
  width?: any;
  height?: any;
  gradientHeight?: any;
  containerStyles?: any;
  textStyles?: any;
  gradient?: boolean;
  disabled?: boolean;
}

const PosdataButton = (props: Props) => {
  const {
    onPress = () => {
      console.log('set prop onPress to FlatButton');
    },
    title,
    width = '100%',
    height,
    gradientHeight = 60,
    containerStyles = {},
    textStyles = {},
    gradient = false,
  } = props;
  return (
    <>
      {gradient ? (
        <GradientButton
          onPress={onPress}
          title={title}
          width={width}
          height={height}
          gradientHeight={gradientHeight}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
      ) : (
        <FlatButton
          onPress={onPress}
          title={title}
          width={width}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
      )}
    </>
  );
};

export default PosdataButton;
