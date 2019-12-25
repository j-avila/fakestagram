import React from 'react'
import {StyleSheet, View, TextInput, Button, Text} from 'react-native'
import {reduxForm, Field} from 'redux-form'

const submit = values => console.log(values)

const RenderInput = props => { 
	// console.log(props)
	const {input, meta, ph} = props
	return (
		<View>
			<TextInput 
				style={styles.input}
				autoCapitalize='none'
				onChangeText={input.onChange}
				onBlur={props.input.onBlur}
				placeholder={ph}
				keyboardType={ input.name === 'email' ? 'email-address' : 'default'}
				secureTextEntry={input.name === 'password' || input.name === 'confirm' ? true : false}
			/>
			{meta.touched && meta.error && <Text style={styles.errorTxt}>{meta.error}</Text>}
		</View>
	)

}

const validate = values => {
	const errors = []
	if(!values.username){
		errors.username = "Campo requerido"
	} 
	
	if(!values.password){
		errors.password = "campo requerido"
	}
	return errors
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
	validate
})(LoginForm)

const styles = StyleSheet.create({
  input: {
		borderColor: 'black',
		padding: 10,
    borderWidth: 1,
    height: 37, 
		width: 250,
		marginBottom: 10
	},
	errorTxt: {
		color: 'tomato',
		marginVertical: 4
	} 
})
