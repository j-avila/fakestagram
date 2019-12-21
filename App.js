<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NoSignedRoutes from './components/noUser/routes';
import SignedRoutes from './components/user/routes';

export default function App() {
  const signed = true
  return (
    <View style={styles.container}>
      {signed ?
        <SignedRoutes />
        : <NoSignedRoutes /> 
      }
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
=======
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
>>>>>>> fb7fe8e0dd49107c4c11e8aba5ef4b6e390c196a
