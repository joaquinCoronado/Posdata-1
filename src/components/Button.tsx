import React, {useEffect} from 'react';
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  Text,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';

import Icon from './Icon';
import {useSettings} from '../context/settings';
import useFade from '../hooks/useFade';

interface Props {
  mode?: 'primary' | 'white' | 'link' | 'secondary-link';
  shadow?: string;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: Boolean;
  disabled?: Boolean;
}

const Button = (props: Props) => {
  const {theme} = useSettings();
  const {opacity, fadeIn, fadeOut} = useFade();

  useEffect(
    () => (props.loading ? fadeIn() : fadeOut()),
    [fadeIn, fadeOut, props.loading],
  );

  if (props.mode === 'white') {
    return (
      <TouchableOpacity
        disabled={props.disabled ? props.disabled : false}
        activeOpacity={0.68}
        style={[
          styles.container,
          props.style,
          {
            shadowColor: theme.colors.text,
            opacity: props.disabled ? 0.5 : 1,
          },
        ]}
        onPress={props.onPress}>
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.text,
              borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
            },
          ]}>
          <View style={styles.textContainer}>
            {props.icon ? <Icon /> : null}
            <Text style={[styles.title, {color: theme.colors.text}]}>
              {props.title}
            </Text>
          </View>
          <Animated.View
            style={[
              styles.loading,
              {opacity, backgroundColor: theme.colors.primary},
            ]}>
            <ActivityIndicator size="small" color="#FFF" />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.68}
      style={[
        styles.container,
        props.style,
        {shadowColor: theme.colors.primary, opacity: props.disabled ? 0.5 : 1},
      ]}
      onPress={props.onPress}>
      <View style={[styles.wrapper, {backgroundColor: theme.colors.primary}]}>
        <View style={styles.textContainer}>
          {props.icon ? <Icon /> : null}
          <Text
            style={[
              styles.title,
              {color: theme.dark ? theme.colors.text : theme.colors.background},
            ]}>
            {props.title}
          </Text>
        </View>
        <Animated.View
          style={[
            styles.loading,
            {opacity, backgroundColor: theme.colors.primary},
          ]}>
          <ActivityIndicator size="small" color="#FFF" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  wrapper: {
    width: '100%',
    height: 52,
    borderRadius: 3,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  loading: {
    position: 'absolute',
    width: '100%',
  },
});

Button.defaultProps = {
  mode: 'primary',
};

export default Button;
