import React, {Component} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import {connect} from 'react-redux'
import LoginForm from './loginForm';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { compose } from 'redux';

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
    dispatch({type: 'LOGIN', payload: values})
  }
})



export default connect(mapStateToProps, mapDispatchToPops)(SignIn)

const styles = StyleSheet.create({
  form: {
    marginVertical: 15
  }
})
