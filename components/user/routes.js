import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Profile from './profile'
import StackSearchNav from './stackSearchNav'
import HomeStackNav from './homeStackNav'
import StackFollow from './StackFollow'
import StackAdd from './StackAdd'

const SignedRoutes = createBottomTabNavigator({ 
  Home: HomeStackNav,
  Search: StackSearchNav,
  Add: StackAdd,
  Follow: StackFollow,
  Profile: Profile
}) 

export default createAppContainer(SignedRoutes) 
  