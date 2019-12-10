import { createStackNavigator } from 'react-navigation-stack'
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
	Comments: {
		screen: Comments,
		tabBarVisible: false,
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		})
	}
})

SearchStackNav.navigationOptions = ({navigation}) => { 
	const { routeName } = navigation.state.routes[navigation.state.index];
  app.visible = true;
  if(routeName === 'Comments'){
    app.visible = true;
  }else{
    app.visible = false;
  }
}

export default SearchStackNav
