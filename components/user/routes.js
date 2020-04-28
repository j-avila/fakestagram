import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import Profile from './profile'
import StackSearchNav from './stackSearchNav'
import HomeStackNav from './homeStackNav'
import StackFollow from './StackFollow'
import StackAdd from './StackAdd'
import { text, highlight } from '../shared/colors'

const SignedRoutes = createBottomTabNavigator(
  {
    Home: HomeStackNav,
    Search: StackSearchNav,
    Add: StackAdd,
    Follow: StackFollow,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName

        routeName === 'Home'
          ? iconName === focused
            ? 'md-home'
            : 'md-home'
          : routeName === 'Search'
          ? iconName === focused
            ? 'md-compass'
            : 'md-search'
          : ''

        console.log()
        return iconName
      }
    }),
    tabBarOptions: {
      activeTintColor: highlight,
      inactiveTintColor: text
    }
  }
)

export default createAppContainer(SignedRoutes)
