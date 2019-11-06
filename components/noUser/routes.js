import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const SignIn = props => {
  console.log(props)
  const { navigation} = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>sign in</Text>
      <Button title="ir a signup" onPress={() => navigation.navigate('signup')} />
    </View>
  )
}

const NoSign = props => {
  const { navigation} = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="atras" onPress={() => navigation.goBack()}/>
      <Text> sign up </Text>
    </View>
  )
}


const NoSignedRoutes = createStackNavigator({
  sign: {
    screen: SignIn,
    navigationOptions: () => ({
      title: 'hometo',
      header: null,
      headerBackTitle: null,
    })
  },
  signup: {
    screen: NoSign, 
    navigationOptions: () => ({
      title: 'sign up',
      header: null  
    })
  }
})

export default createAppContainer(NoSignedRoutes);