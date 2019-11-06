import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Home from './home'
import Add from './add'
import Follow from './follow'
import Profile from './profile'
import Search from './search'

const SignedRoutes = createBottomTabNavigator({ 
  Home: Home,
  Search: Search,
  Add: Add,
  Follow: Follow,
  Profile: Profile 
})

export default createAppContainer(SignedRoutes)