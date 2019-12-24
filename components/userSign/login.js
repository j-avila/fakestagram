import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import LoginForm from './loginForm';

const SignIn = props => {
  // console.log(props)
  const { navigation } = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>sign in</Text>
      <LoginForm />
      <Button title="ir a signup" onPress={() => navigation.navigate('signup')} />
    </View>
  )
}

export default SignIn
