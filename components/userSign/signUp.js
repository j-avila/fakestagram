import React, { useCallback, Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux'
import {REGISTER} from '../../store/actions/types'
import SingUpForm from './singUpForm';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { registerAction } from '../../store/actions/actions';
import ImagePickerComp from './../imagePicker'

class NoSigned extends Component {
	constructor(){
		super()
	}
	
	register = values => {
		const user = {
			...values,
			avatar: this.props.avatar
		}
		// console.log('values: ', user)
		this.props.userRegister(values, this.props.avatar)
	}

	render(){
		const { navigation, avatar } = this.props
		return (
		<View style={styles.container}>
			<Text> Sign up </Text>
			<ImagePickerComp />
			<SingUpForm action={this.register} navigation={navigation.goBack} avatar={avatar} />
		
		</View>
	)}
}

const mapStateToProps = state => ({
	numero: state.defaultReducer,
	avatar: state.setAvatar
})

const mapDisaptchToProps = dispatch => ({
	userRegister: (values, avatar) => {
		dispatch(registerAction(REGISTER, {values, avatar}))
		console.log({values, avatar})
	}
})

export default connect(mapStateToProps, mapDisaptchToProps)(NoSigned)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center' 
	},
})