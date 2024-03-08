import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../../redux/actions';

const EditTaskModal = ({visible, onClose}) => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    getTask();
    console.log(taskID)
  }, [taskID]);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setAbout(Task.Desc);
    }
  };

  const setTask = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: about,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            onChangeText={value => setTitle(value)}
          />
          <TextInput
            style={styles.modalInput}
            multiline
            numberOfLines={10}
            value={about}
            onChangeText={value => setAbout(value)}
            placeholder="Enter task title"
            placeholderTextColor="#BEBEBE"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTask(), onClose();
              }}>
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
