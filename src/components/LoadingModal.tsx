import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator, Text} from 'react-native';

import {useSettings} from '../context/settings';

interface Props {
  visible: boolean;
  text?: string;
  activitiIndicatorColor?: string;
}

const LoadingModal = (props: Props) => {
  const {theme} = useSettings();
  const {
    visible = false,
    text = 'Loading...',
    activitiIndicatorColor = '#000',
  } = props;

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.loadingcontainer}>
        <ActivityIndicator size="large" color={activitiIndicatorColor} />
        <Text style={[{color: theme.colors.text}]}>{text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;
