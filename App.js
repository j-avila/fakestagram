import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import store from './store';
import HomeRoute from './components/homeRoute';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <HomeRoute styles={styles}/>
      </Provider>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  
}); 
