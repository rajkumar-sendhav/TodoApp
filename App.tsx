import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={Store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
