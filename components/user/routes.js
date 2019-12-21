import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Add from './add'
import Profile from './profile'
import StackSearchNav from './stackSearchNav'
import HomeStackNav from './homeStackNav'
import StackFollow from './StackFollow'

const SignedRoutes = createBottomTabNavigator({ 
  Home: HomeStackNav,
  Search: StackSearchNav,
  Add: Add,
  Follow: StackFollow,
  Profile: Profile
}) 

export default createAppContainer(SignedRoutes) 
  