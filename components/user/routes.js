<<<<<<< HEAD
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
=======
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
>>>>>>> fb7fe8e0dd49107c4c11e8aba5ef4b6e390c196a
  