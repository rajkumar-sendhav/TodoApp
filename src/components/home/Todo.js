import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AddIcon from '../../assets/addicon.png';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import EditTaskModal from './EditTaskModal';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTaskID, setTasks} from '../../redux/actions';
import CustomModalAlert from './CustomModalAlert';

const Todo = () => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTasks();
  }, [tasks]);

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const setTask = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        const newTask = {
          ID: taskID,
          Title: title,
          Desc: about,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = newTask;
        } else {
          newTasks = [...tasks, newTask];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            setTitle('');
            setAbout('');
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err));
  };

  const toggleEditButton = id => {
    setSelectedTaskID(id === selectedTaskID ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.textInput}
            placeholder="Title..."
            placeholderTextColor="#BEBEBE"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textInput}
            placeholder="About..."
            placeholderTextColor="#BEBEBE"
            value={about}
            onChangeText={setAbout}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setTaskID(tasks.length + 1));
            setTask();
          }}>
          <Image source={AddIcon} style={styles.image} />
        </TouchableOpacity>
      </View>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          style={{marginTop: 10}}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => toggleEditButton(item.ID)}>
                <View style={styles.item_raw}>
                  <View style={styles.item_container}>
                    <Text style={styles.title}>{item.Title}</Text>
                    <Text style={styles.desc}>{item.Desc}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setDeleteConfirmationVisible(true);
                      setSelectedTaskID(item.ID);
                    }}>
                    <Image source={Delete} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {selectedTaskID === item.ID && (
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setTaskID(item.ID));
                      setModalVisible(true);
                      setSelectedTaskID(null); // Reset selected task ID after modal opened
                    }}>
                    <Image source={Edit} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
          keyExtractor={item => item.ID.toString()}
        />
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No tasks</Text>
        </View>
      )}
      <EditTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <CustomModalAlert
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        onDelete={() => {
          deleteTask(selectedTaskID);
          setDeleteConfirmationVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#FF8303',
    marginBottom: 5,
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#1F1E1B',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 11,
    marginLeft: 10,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 3,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FF8303',
  },
  item: {
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#FF8303',
    backgroundColor: '#1F1E1B',
    marginVertical: 10,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    fontSize: 18,
    color: '#fff',
  },
  item_raw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_container: {
    flex: 1,
  },
});

export default Todo;
