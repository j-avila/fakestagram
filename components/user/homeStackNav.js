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
