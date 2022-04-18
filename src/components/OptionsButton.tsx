import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSettings} from '../context/settings';

interface Props {
  onPress?: () => void;
}

const OptionsButton = (props: Props) => {
  const {theme} = useSettings();
  const {
    onPress = () => {
      console.log('set prop onPress to FlatButton');
    },
  } = props;
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {
        onPress();
      }}>
      <Icon
        color={theme.colors.text}
        size={24}
        name="ellipsis-vertical-sharp"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    borderColor: 'black',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default OptionsButton;
