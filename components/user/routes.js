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
        let iconName =
          routeName === 'Home'
            ? 'md-home'
            : routeName === 'Search'
            ? 'md-search'
            : routeName === 'Add'
            ? 'md-add'
            : routeName === 'Follow'
            ? 'md-contacts'
            : routeName === 'Profile'
            ? 'md-person'
            : 'md-pizza'

        return <Ionicons name={iconName} size={20} />
      }
    }),
    tabBarOptions: {
      activeTintColor: highlight,
      inactiveTintColor: text
    }
  }
)

export default createAppContainer(SignedRoutes)
