import React, { useCallback, Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux'
import {REGISTER, SET_AVATAR, DELETE_AVATAR} from '../../store/actions/types'
import SingUpForm from './singUpForm';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { registerAction, setAvatar } from '../../store/actions/actions';
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
		const { navigation, avatar,setAvatarImg, deleteAvatar } = this.props
		return (
		<View style={styles.container}>
			<Text> Sign up </Text>
			<ImagePickerComp 
				imageObj={this.props.avatar}
				action={this.props.setAvatarImg}
				avatarSize
				radius
			/>
			<SingUpForm action={this.register} navigation={navigation.goBack} avatar={avatar} />
		
		</View>
	)}
}

const mapStateToProps = state => ({
	...state,
	numero: state.defaultReducer,
	avatar: state.setAvatar
})

const mapDisaptchToProps = dispatch => ({
	userRegister: (values, avatar) => {
		dispatch(registerAction(REGISTER, {values, avatar}))
		// console.log({values, avatar})
	},
	setAvatarImg: (image) => { 
    dispatch(setAvatar(SET_AVATAR, image))
  },
  deleteAvatar: () => {
    dispatch(setAvatar(DELETE_AVATAR, null))
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