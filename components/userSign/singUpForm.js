import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, TouchableHighlight} from 'react-native'
import {reduxForm, Field} from 'redux-form'

import {primary} from '../../styles/colors'


const submit = values => console.log(values)

const RenderInput = props => { 
	// console.log(props)
	return (
		<View>
			<TextInput 
				style={styles.input}
				autoCapitalize='none'
				onChangeText={props.input.onChange}
				onBlur={props.input.onBlur}
				placeholder={props.ph}
				keyboardType={ props.input.name === 'email' ? 'email-address' : 'default'}
				secureTextEntry={props.input.name === 'password' || props.input.name === 'confirm' ? true : false}

			/>
				{props.meta.touched && props.meta.error && <Text style={styles.errorTxt}>{props.meta.error}</Text>}
		</View>
	)
}

const validate = values => {
	const errors = []
	
	if(!values.username){
		errors.username = "campo requerido"
	} else if (values.username.length < 5) {
		errors.username = "el nombre debe tener al menos 5 caracteres"
	} else if(values.username.length > 10) {
		errors.username = "el nombre deber ser menor a 10 caracteres"
	}

	if(!values.email){
		errors.email = "el correo  es requerido"
	} else if(!/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}/i.test(values.email) ){
		errors.email = "el valor debe pertenecer a un correo valido"
	}

	if(!values.password) {
		errors.password = "El password es requerido"
	} else if (values.password.length < 6 ) {
		errors.password = "El password debe tener mas de 4 caracteres"
	} else if (values.password.length > 10 ) {
		errors.password = "El password debe tener menos de 10 caracteres"
	}

	if(!values.confirm) {
		errors.confirm = "es necesario validar el password"
	} else if (values.confirm !== values.password) {
		errors.confirm = "deben coincidir el password y la confirmacion"
	}

	return errors

}

const SignUpForm = props => { 
	const { handleSubmit, action, navigation, avatar } = props

	console.log('avatar: ', avatar)

	return (
		<View style={styles.form}>
			<Text> Registro de usuario: </Text>
			<Field name="username" component={RenderInput} ph="ejem: alberto tonas" /> 
			<Field name="email" component={RenderInput} ph="correofalso@correocaliente.com" />
			<Field name="password" component={RenderInput} ph="password" />
			<Field name="confirm" component={RenderInput} ph="confirmar password" />
			<Button color={primary} title="ingresar" onPress={ handleSubmit( values => action(values)) } disabled={avatar == null ? true : false} />
			<TouchableHighlight onPress={() => navigation()} >
					<Text style={styles.touchTxt} >Ya tienes una cuenta? ingresa</Text> 
			</TouchableHighlight>
		</View>
	)
}

export default reduxForm({ 
	form: 'signIn',
	validate
})(SignUpForm)

const styles = StyleSheet.create({
	form: {
		flex: 3,
		marginVertical: 0
	},
  input: {
		borderColor: 'black',
		padding: 10,
    borderWidth: 1,
    height: 37, 
		width: 250,
		marginBottom: 10
	}, 
	touchTxt: {
		textAlign: 'center',
		paddingVertical: 10,
	},
	errorTxt: {
		color: 'tomato',
		marginVertical: 4
	}
})
