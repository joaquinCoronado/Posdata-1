import React from 'react';
import {Text, StyleSheet} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  style: any;
  children: any;
}

const GradientText = (props: Props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={['#FF00D6', '#FF4D00']}>
        <Text {...props} style={[props.style, styles.text]} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    opacity: 0,
  },
});

export default GradientText;
