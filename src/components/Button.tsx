import React from 'react';
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
} from 'react-native';
import propTypes from 'prop-types';

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
  diabled?: Boolean;
}

const Button = (props: Props) => {
  const {theme} = useSettings();
  const {opacity, fadeIn, fadeOut} = useFade();
  return (
    <TouchableOpacity
      activeOpacity={0.68}
      style={[
        styles.wrapper,
        props.style,
        {shadowColor: theme.colors.primary, opacity: props.disabled ? 0.5 : 1},
      ]}
      onPress={props.onPress}>
      <View
        style={[styles.innerWrapper, {backgroundColor: theme.colors.primary}]}>
        <View style={styles.button}>
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
            {opacity, backgroundColor: theme.colors.text},
          ]}>
          <ActivityIndicator size="small" color="#FFF" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  innerWrapper: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#222',
  },
});

Button.propTypes = {
  buttonStyle: propTypes.object,
  icon1: propTypes.string,
  icon2: propTypes.string,
  mode: propTypes.oneOf(['primary', 'white', 'link', 'secondary-link']),
  onPress: propTypes.func.isRequired,
  shadow: propTypes.bool,
  style: propTypes.object,
  textStyle: propTypes.object,
  title: propTypes.string.isRequired,
};

Button.defaultProps = {
  mode: 'primary',
};

export default Button;
