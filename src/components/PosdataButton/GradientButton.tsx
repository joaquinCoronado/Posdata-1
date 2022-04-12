import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSettings} from '../../context/settings';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../GradientText';

interface Props {
  onPress: () => void;
  title: string;
  width?: any;
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
    containerStyles = {},
    textStyles = {},
  } = props;
  return (
    <LinearGradient
      colors={['#FF00D6', '#FF4D00']}
      style={[styles.gradientContainer, containerStyles, {width: width}]}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.buttonContainer,
          containerStyles,
          {borderColor: text, backgroundColor: background},
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
    height: '100%',
    margin: 2,
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    marginTop: 15,
    marginRight: 0,
    borderRadius: 5,
    backgroundColor: 'transparent',
    padding: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GradientButton;
