import { createStackNavigator, HeaderTitle } from 'react-navigation-stack'
import React from 'react'
import { Button, TouchableOpacityBase } from 'react-native'
import Add from './add'
import CreatePost from './createPost'
import { Ionicons } from '@expo/vector-icons'
import DefaultHeader from '../shared/defaultHeader'

const StackAdd = createStackNavigator({
  Add: {
    screen: Add,
    navigationOptions: ({ navigation }) => ({
      title: 'agrgear post',
      headerTitle: props => (
        <DefaultHeader
          title="agrgear post"
          leftArea={() => navigation.goBack(null)}
        />
      )
    })
  },
  Selection: CreatePost,
  navigationOptions: navigation => ({
    title: 'Selecciona una foto de la galeria',
    headerTitle: props => (
      <DefaultHeader
        title="Selecciona una foto de la galeria"
        leftArea={() => console.log('back')}
      />
    )
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
