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
	
})

export default SearchStackNav

