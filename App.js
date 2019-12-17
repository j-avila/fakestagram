import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import NoSignedRoutes from './components/noUser/routes';
import SignedRoutes from './components/user/routes';
import store from './store';

export default function App() {
  const signed = false
  return (
    <View style={styles.container}>
      <Provider store={store}>
        {signed ? <SignedRoutes /> : <NoSignedRoutes />}
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
