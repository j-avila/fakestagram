<<<<<<< HEAD
import { createStackNavigator } from 'react-navigation-stack';
import Home from './home'
import Post from './post'
import Profile from './profile'
import Comments from './comments'
import {app} from './stackSearchNav'

const HomeStackNav = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			title: 'Home'
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
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		})
	},
})

HomeStackNav.navigationOptions = ({navigation}) => { 
	let tabBarVisible = true
	if(navigation.state.index > 2){
		tabBarVisible = false
	}
	// console.log(navigation.state)
	return {tabBarVisible}
}

export default HomeStackNav  
=======
import { createStackNavigator } from 'react-navigation-stack';
import Home from './home'
import Post from './post'
import Profile from './profile'
import Comments from './comments'
import {app} from './stackSearchNav'

const HomeStackNav = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			title: 'Home'
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
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		})
	},
})

HomeStackNav.navigationOptions = ({navigation}) => { 
	let tabBarVisible = true
	const screenRoutes = navigation.state
	const excludeRoute = screenRoutes.routes.filter( item => item.routeName === 'Comments')[0]

	excludeRoute && excludeRoute.routeName === 'Comments' ? tabBarVisible = false  : false
	// console.log(screenRoutes, excludeRoute)
	return {tabBarVisible}





}

export default HomeStackNav  
>>>>>>> fb7fe8e0dd49107c4c11e8aba5ef4b6e390c196a
