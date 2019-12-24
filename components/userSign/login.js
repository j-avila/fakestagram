import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import LoginForm from './loginForm';
import { TouchableHighlight } from 'react-native-gesture-handler';

const SignIn = props => {
  // console.log(props)
  const { navigation } = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>sign in</Text>
      <LoginForm styles={styles.form} />
      <TouchableHighlight onPress={() => navigation.navigate('signup')}>
        <Text> No tienes cuenta? crea una </Text>
      </TouchableHighlight>
    </View>
  )
}
 
export default SignIn

const styles = StyleSheet.create({
  form: {
    marginVertical: 15
  }
})
