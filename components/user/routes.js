import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Add from './add'
import Follow from './follow'
import Profile from './profile'
import Search from './search'
import HomeStackNav from './homeStackNav'

const SignedRoutes = createBottomTabNavigator({ 
  Home: HomeStackNav,
  Search: Search,
  Add: Add,
  Follow: Follow,
  Profile: Profile 
})

export default createAppContainer(SignedRoutes)