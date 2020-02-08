import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { USER_LOGGED, USER_NO_LOGGED } from '../store/actions/types'
import { authService } from '../store/servicios/firebase'
import { manageSession } from '../store/actions/actions'

import NoSignedRoutes from './noUser/routes'
import SignedRoutes from './user/routes'

class HomeRoute extends Component {
  async componentDidMount() {
    await this.props.handleSession()
  }

  render() {
    const { styles, session } = this.props
    return (
      <View style={styles.container}>
        {session ? <SignedRoutes /> : <NoSignedRoutes />}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.sessionHandler
  }
}

const mapDispatchToProps = dispatch => ({
  handleSession: () => {
    authService.onAuthStateChanged(user => {
      if (user) {
        console.log('has session active', user.email)
        dispatch(manageSession(USER_LOGGED, user))
      } else {
        console.log('has no session open')
        dispatch(manageSession(USER_NO_LOGGED, user))
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute)
