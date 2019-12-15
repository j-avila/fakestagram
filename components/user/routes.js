import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Add from './add'
import Follow from './follow'
import Profile from './profile'
import StackSearchNav from './stackSearchNav'
import HomeStackNav from './homeStackNav'

const SignedRoutes = createBottomTabNavigator({ 
  Home: HomeStackNav,
  // Search: NavTabSearch, 
  Search: StackSearchNav,
  Add: Add,
  Follow: Follow,
  Profile: Profile 
}) 

export default createAppContainer(SignedRoutes) 
  