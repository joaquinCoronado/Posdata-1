import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {useSettings} from '../context/settings';
interface Props {
  visible: boolean;
  children?: React.ReactNode;
}

const PopupMenu = (props: Props) => {
  const {theme} = useSettings();
  const {background} = theme.colors;
  const {visible, children} = props;

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={[styles.content, {backgroundColor: background}]}>
          {children}
        </View>
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
    borderRadius: 15,
  },
});

export default PopupMenu;
