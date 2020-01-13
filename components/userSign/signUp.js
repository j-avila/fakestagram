import React, { useCallback, Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux'
import {REGISTER} from '../../store/actions/types'
import SingUpForm from './singUpForm';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { registerAction } from '../../store/actions/actions';

class NoSigned extends Component {
	constructor(){
		super()
	}
	
	register = values => {
		// console.log(values)
		this.props.userRegister(values)
	}
		
	render(){
		const { navigation } = this.props
		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text> Sign up </Text>
			<SingUpForm styles={styles.form} action={this.register} />
			<TouchableHighlight onPress={() => navigation.goBack()}>
					<Text>Ya tienes una cuenta? ingresa</Text>
			</TouchableHighlight>
		</View>
	)}
}

const mapStateToProps = state => ({
	numero: state.defaultReducer
})

const mapDisaptchToProps = dispatch => ({
	userRegister: (values) => {
		dispatch(registerAction(REGISTER, values))
	}
})

export default connect(mapStateToProps, mapDisaptchToProps)(NoSigned)

const styles = StyleSheet.create({
	form: {
		marginVertical: 20
	}
})