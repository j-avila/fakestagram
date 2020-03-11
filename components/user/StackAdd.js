import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { Button, TouchableOpacityBase } from 'react-native'
import Add from './add'
import CreatePost from './createPost'
import { Ionicons } from '@expo/vector-icons'

const StackAdd = createStackNavigator({
  Add: {
    screen: Add,
    navigationOptions: navigation => ({
      title: 'Add',
      left: props => <Ionicons name="md-arrow-back" onPress={alert('poop')} />
    })
  },
  Selection: CreatePost,
  navigationOptions: navigation => ({
    title: 'Select a photo from gallery'
  })
})

StackAdd.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  const screenRoutes = navigation.state
  const excludeRoute = screenRoutes.routes.filter(
    item => item.routeName === 'Add'
  )[0]

  excludeRoute && excludeRoute.routeName === 'Add'
    ? (tabBarVisible = false)
    : false
  // console.log(screenRoutes, excludeRoute)
  return { tabBarVisible }
}

export default StackAdd
