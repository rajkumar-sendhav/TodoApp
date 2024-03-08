import {View, StyleSheet} from 'react-native';
import React from 'react';
import Todo from '../components/home/Todo';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Todo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
    padding: 16,
  },
});

export default HomeScreen;
