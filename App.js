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
