import { createStackNavigator } from 'react-navigation-stack';
import Home from './home'
import Post from './post'
import User from './profile'
import Comments from './comments'

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
	User: {
		screen: User,
		navigationOptions: () => ({
			title: 'User'
		})
	},
	Comments: {
		screen: Comments,
		navigationOptions: () => ({
			title: 'Comments'
		})
	},
})

export default HomeStackNav  