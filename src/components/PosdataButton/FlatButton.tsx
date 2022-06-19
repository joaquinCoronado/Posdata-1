import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useSettings} from '../../context/settings';

interface Props {
  onPress?: () => void;
  title: string;
  width?: any;
  containerStyles?: any;
  textStyles?: any;
}

const FlatButton = (props: Props) => {
  const {theme} = useSettings();
  const {text} = theme.colors;
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
    <TouchableOpacity
      activeOpacity={0.68}
      style={[
        styles.buttonContainer,
        containerStyles,
        {borderColor: text, width: width},
      ]}
      onPress={() => {
        onPress();
      }}>
      <Text style={[styles.buttonText, {color: text}, textStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderColor: 'black',
    borderWidth: 1.5,
    marginTop: 15,
    marginRight: 0,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FlatButton;
