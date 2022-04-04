import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface Props {
  onPress?: () => void;
  title: string;
}

const FlatButton = (props: Props) => {
  const {
    onPress = () => {
      console.log('set prop onPress to FlatButton');
    },
    title,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.68}
      style={styles.buttonContainer}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '98%',
    height: 55,
    borderColor: 'black',
    borderWidth: 1.5,
    marginTop: 15,
    marginBottom: 255,
    marginRight: 0,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FlatButton;
