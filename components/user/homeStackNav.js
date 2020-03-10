import { createStackNavigator } from 'react-navigation-stack'
import Home from './home'
import Post from './post'
import Profile from './profile'
import Comments from './comments'
import { app } from './stackSearchNav'
import HomeHeader from '../shared/homeHeader'

const HomeStackNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: 'Home',
      headerTitle: props => <HomeHeader />
    })
  },
  Post: {
    screen: Post,
    navigationOptions: () => ({
      title: 'post'
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      title: 'Profile'
    })
  },
  Comments: {
    screen: Comments,
    tabBarVisible: false,
    navigationOptions: ({ navigation }) => ({
      title: 'Comments'
    })
  }
})

HomeStackNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  const screenRoutes = navigation.state
  const excludeRoute = screenRoutes.routes.filter(
    item => item.routeName === 'Comments'
  )[0]

  excludeRoute && excludeRoute.routeName === 'Comments'
    ? (tabBarVisible = false)
    : false
  // console.log(screenRoutes, excludeRoute)
  return { tabBarVisible }
}

export default HomeStackNav
