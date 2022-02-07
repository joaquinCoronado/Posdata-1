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
  const {
    theme: {colors, dividerColor, dark},
  } = useSettings();
  return (
    <View style={[styles.wrapper, props.style]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        clearButtonMode="while-editing"
        style={{
          ...styles.input,
          backgroundColor: colors.background,
          borderColor: colors.text,
          color: colors.text,
        }}
        selectionColor={colors.primary}
        placeholderTextColor={dividerColor}
        keyboardAppearance={dark ? 'dark' : 'light'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    paddingBottom: 2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    padding: 12,
    borderWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
  },
});

export default Input;
