import React, { useEffect } from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import Profile from './profile'
import StackSearchNav from './stackSearchNav'
import HomeStackNav from './homeStackNav'
import StackFollow from './StackFollow'
import StackAdd from './StackAdd'
import { text, highlight } from '../shared/colors'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../shared/avatar'
import { getCurrentProfile } from '../../store/actions'
import Home from '../../assets/home.svg'
import Discover from '../../assets/explore.svg'
import Add from '../../assets/add.svg'
import Rss from '../../assets/rss.svg'

const UserLink = props => {
  const userLogged = useSelector(state => state.sessionHandler)
  const currentUser = userLogged.hasOwnProperty('uid')
    ? useSelector(state => state.currentUser)
    : {}
  const dispatch = useDispatch()

  const getAvatar = async id => {
    dispatch(getCurrentProfile(id))
  }

  useEffect(() => {
    getAvatar(userLogged.uid)
  }, [])

  return currentUser.hasOwnProperty('user') ? (
    <Avatar
      image={{ uri: currentUser.user.avatar }}
      size={{ height: 25, width: 25 }}
    />
  ) : (
    <Avatar size={{ height: 25, width: 25 }} />
  )
}

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
        let iconName =
          routeName === 'Home' ? (
            <Home />
          ) : routeName === 'Search' ? (
            <Discover />
          ) : routeName === 'Add' ? (
            <Add />
          ) : routeName === 'Follow' ? (
            <Rss />
          ) : (
            <Home />
          )

        let ico = routeName === 'Profile' ? <UserLink /> : iconName

        return ico
      },
      name: navigation.state.routeName === 'Profile' ? 'booomer' : ''
    }),
    tabBarOptions: {
      activeTintColor: highlight,
      inactiveTintColor: text
    }
  }
)

export default createAppContainer(SignedRoutes)
