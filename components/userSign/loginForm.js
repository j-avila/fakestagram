import React from 'react'
import {StyleSheet, View, TextInput, Button, Text} from 'react-native'
import {reduxForm, Field} from 'redux-form'

const submit = values => console.log(values)

const RenderInput = props => { 
	// console.log(props)
	return <TextInput 
						style={styles.input}
						autoCapitalize='none'
						onChangeText={props.input.onChange}
						placeholder={props.ph}
						keyboardType={ props.input.name === 'email' ? 'email-address' : 'default'}
						secureTextEntry={props.input.name === 'password' || props.input.name === 'confirm' ? true : false}
					/>
}


const LoginForm = props => {
	const { handleSubmit } = props
	return (
		<View style={props.styles}>
			<Text> Ingreso de Usuario: </Text>
			<Field name="username" component={RenderInput} ph="ejem: alberto tonas" /> 
			<Field name="password" component={RenderInput} ph="password" />
			<Button color="tomato" title="Entrar" onPress={ handleSubmit(values => console.log(values)) } />
		</View>
	)
} 

export default reduxForm({ 
  form: 'login',
})(LoginForm)

const styles = StyleSheet.create({
  input: {
		borderColor: 'black',
		padding: 10,
    borderWidth: 1,
    height: 37, 
		width: 250,
		marginBottom: 10
  } 
})
