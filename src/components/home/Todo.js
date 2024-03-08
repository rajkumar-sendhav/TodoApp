import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import AddIcon from '../../assets/addicon.png';
import EditTaskModal from './EditTaskModal';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addToDo = () => {
    return (
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
        <TouchableOpacity>
          <Image source={AddIcon} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {addToDo()}
      <View style={styles.textContainer}>
        <Text style={styles.text}>No tasks</Text>
      </View>
      <Button title="edit" onPress={() => setModalVisible(true)} />
      <EditTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1F1E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
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
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 11,
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
});

export default Todo;
