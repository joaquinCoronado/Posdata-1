import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator, Text} from 'react-native';

interface Props {
  visible: boolean;
  text?: string;
}

const LoadingModal = (props: Props) => {
  const {visible = false, text = 'Loading'} = props;

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.loadingcontainer}>
        <View style={styles.itemsContainer}>
          <ActivityIndicator size="large" color={'#fff'} />
          <Text style={styles.textStyles}>{text}</Text>
        </View>
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
  itemsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  textStyles: {color: '#fff', fontWeight: '400', fontSize: 20, marginTop: 5},
});

export default LoadingModal;
