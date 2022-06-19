import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useSettings} from '../../context/settings';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../GradientText';

interface Props {
  onPress: () => void;
  title: string;
  width?: any;
  height?: any;
  gradientHeight?: any;
  containerStyles?: any;
  textStyles?: any;
}

const GradientButton = (props: Props) => {
  const {theme} = useSettings();
  const {text, background} = theme.colors;
  const {
    onPress = () => {
      console.log('set prop onPress to FlatButton');
    },
    title,
    width = '100%',
    height = '100%',
    gradientHeight = 55,
    containerStyles = {},
    textStyles = {},
  } = props;
  return (
    <LinearGradient
      colors={['#FF00D6', '#FF4D00']}
      style={[
        styles.gradientContainer,
        containerStyles,
        {width: width, height: gradientHeight},
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.buttonContainer,
          containerStyles,
          {
            borderColor: text,
            backgroundColor: background,
            height: height,
          },
        ]}
        onPress={() => {
          onPress();
        }}>
        <GradientText style={[styles.buttonText, {color: text}, textStyles]}>
          {title}
        </GradientText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    marginRight: 0,
    borderRadius: 5,
    padding: 2,
    paddingBottom: Platform.OS === 'ios' ? 2 : 1.6,
    paddingRight: Platform.OS === 'ios' ? 2 : 1.3,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GradientButton;
