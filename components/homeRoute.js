import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {USER_SESSION, USER_NO_SESSION} from '../store/actions/types'
import { authService } from '../store/servicios/firebase'
import {manageSession} from '../store/actions/actions'

import NoSignedRoutes from './noUser/routes'
import SignedRoutes from './user/routes'

class HomeRoute extends Component {
	constructor(){
		super()
		this.state={
			signed: false
		}
	}

	async componentDidMount() {
		await this.props.handleSession()
	}
	
	render() {
		const {signed} = this.state
		const {styles} = this.props
		return (
			<View style={styles.container}>
				{signed ? <SignedRoutes /> : <NoSignedRoutes />}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	console.log("store", state)
	return (
		{
			props: state.props
		}
	)
}

const mapDispatchToProps = dispatch => ({
	handleSession: () => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				console.log(user.toJSON())
				dispatch(manageSession(USER_LOGGED, user))
			} else {
				console.log('has no session open')
				dispatch(manageSession(USER_NO_LOGGED, user))
			}
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
