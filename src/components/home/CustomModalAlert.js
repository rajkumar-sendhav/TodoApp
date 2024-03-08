import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomModalAlert = ({visible, onCancel, onDelete}) => {
  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={{height: 5, width: '80%', backgroundColor: '#FF8303'}} />
        <View style={styles.modalContent}>
          <Text style={styles.message}>Delete this task?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1B1A17',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#1F1E1B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#FF8303',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomModalAlert;
