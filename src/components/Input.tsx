import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
} from 'react-native';
import {useSettings} from '../context/settings';

interface Props extends TextInputProps {
  label?: string;
}

const Input = (props: Props) => {
  const {settings} = useSettings();
  return (
    <View style={[styles.wrapper, props.style]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        clearButtonMode="while-editing"
        style={styles.input}
        {...props}
        selectionColor={'red'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 6,
  },
  label: {},
  input: {
    borderColor: '#000',
    paddingVertical: 4,
    borderWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
  },
});

export default Input;
