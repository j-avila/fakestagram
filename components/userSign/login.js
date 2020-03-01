import React, {Component} from 'react'
import {connect} from 'react-redux'
import {LOGIN} from '../../store/actions/types'
import { View, Text, Button, StyleSheet } from 'react-native';
import LoginForm from './loginForm';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { loginAction } from '../../store/actions/actions';

class SignIn extends Component {
  constructor(){
    super()
  }
  
  handleLogin = (values) => {
    this.props.userLogin(values)
  }
  
  render(){
    const { navigation } = this.props
    
    return (
      <View style={styles.container}>
        <Text>sign in</Text>
        <LoginForm styles={styles.form} action={this.handleLogin} />
        <TouchableHighlight onPress={() => navigation.navigate('signup')}>
          <Text> No tienes cuenta? crea una </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToPops = dispatch => ({
  userLogin: (values) => {
    dispatch(loginAction(LOGIN, values))
  }
})



export default connect(mapStateToProps, mapDispatchToPops)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    marginVertical: 15
  }
})
