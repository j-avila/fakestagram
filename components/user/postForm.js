import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'


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

class PostForm extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
        <View style={styles.form}>
          <Text> Description of the photo: </Text>
          <Field 
            name="description"
            component={RenderInput}
            ph="what do you feel whan take it?"
            multiline
          /> 
          <Button
            title="Post"
          />
        </View>
    )
  }
}

export default reduxForm({ 
	form: 'createPost',
	validate
})(PostForm)

const styles = StyleSheet.create({
  form: {
    flex: 2,
    marginTop: 45,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  input: {
    borderColor: 'black',
		padding: 8,
    borderWidth: 1,
		width: 250,
		marginBottom: 18
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
