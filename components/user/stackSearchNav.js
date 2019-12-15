import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from './search'
import Post from './post'
import Profile from './profile'
import Comments from './comments'

export let app;
app = {} || app;

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



const NavTabSearch = createBottomTabNavigator({
	Search: SearchStackNav,
	Comments: {
		screen: Comments,
		tabBarVisible: false,
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		})
	} 
})

NavTabSearch.navigationOptions = ({navigation}) => { 
	app.visible = false;
}

export default NavTabSearch
