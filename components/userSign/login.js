import React from 'react'
import { View, Text,TextInput, Button, StyleSheet } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
// import useForm from '../useForm'

const submit = values => console.log(values)
const renderInput = ({input: {onChange, ...restInput}}) => { 
  return <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
}

const SignIn = props => {
  // console.log(props)
  const { navigation, handleSubmit } = props


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>sign in</Text>
      <Text> usuario: </Text>
      <Field name="username" component={renderInput} /> 
      <Button color="tomato" title="Login" onPress={handleSubmit(submit)} />
      <Button title="ir a signup" onPress={() => navigation.navigate('signup')} />
    </View>
  )
}

export default reduxForm({ 
  form: 'login',
  initialValues: {user: 'user'},
})(SignIn)


const styles = StyleSheet.create({
  button: {
    color: 'tomato'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
})