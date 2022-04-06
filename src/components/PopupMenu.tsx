import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

interface Props {
  visible: boolean;
  children?: React.ReactNode;
}

const PopupMenu = (props: Props) => {
  const {visible, children} = props;

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: 15,
    maxHeight: '30%',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
});

export default PopupMenu;
