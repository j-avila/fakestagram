import React from 'react'
import {StyleSheet, View, TextInput, Button, Text} from 'react-native'
import {reduxForm, Field} from 'redux-form'

const submit = values => console.log(values)

const RenderInput = props => { 
	// console.log(props)
  return <TextInput style={styles.input} onChangeText={props.input.onChange} />
}


const LoginForm = props => {
	const { handleSubmit } = props
	return (
		<View>
				<Text> usuario: </Text>
				<Field name="username" component={RenderInput} /> 
				<Field name="email" component={RenderInput} /> 
				<Field name="password" component={RenderInput} /> 
				<Field name="confirm" component={RenderInput} /> 
				<Button color="tomato" title="Login" onPress={ handleSubmit(values => console.log(values)) } />
		</View>
	)
} 

export default reduxForm({ 
  form: 'login',
})(LoginForm)

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37, 
		width: 250,
		marginBottom: 10
  }
})
