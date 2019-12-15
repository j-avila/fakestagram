import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from './search'
import Post from './post'
import Profile from './profile'
import Comments from './comments'

const SearchStackNav = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions: () => {
			title: 'Search'
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: () => ({
			title: 'Profile'
		})
	},
	Comments: {
		screen: Comments,
		navigationOptions: () => ({
			title: 'Comments'
		})
	},
	
})


/* SearchStackNav.navigationOptions = ({navigation}) => { 
	let tabBarVisible = true
	const screenRoutes = navigation.state
	const excludeRoute = screenRoutes.routes.length > 1 && screenRoutes.routes[1].routeName
	if(excludeRoute === 'Comments' ){
		tabBarVisible = false
	}
	// console.log(navigation.state, excludeRoute)
	return {tabBarVisible}
} */

export default SearchStackNav
