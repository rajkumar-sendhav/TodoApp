import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';

const EditTaskModal = ({visible, onClose, onSave, title, about}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalInput}
            placeholder="Title..."
            placeholderTextColor="#BEBEBE"
            value={title}
            // onChangeText={setTitle}
          />
          <TextInput
            style={styles.modalInput}
            multiline
            numberOfLines={10}
            value={title}
            onChangeText={about}
            placeholder="Enter task title"
            placeholderTextColor="#BEBEBE"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={(onSave, onClose)}>
              <Text style={styles.buttonText}>Save</Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1B1A17',
    borderRadius: 10,
    padding: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#FF8303',
    marginBottom: 16,
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#1F1E1B',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTaskModal;
