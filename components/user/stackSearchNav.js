import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import Search from './search'
import Profile from './profile'
import Comments from './comments'
import SearchHeader from '../shared/searchHeader'
import SearchIndex from './searchIndex'

const SearchStackNav = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: navigation => ({
      title: 'Searcho',
      headerTitle: props => <SearchHeader {...navigation} />
    })
  },
  SearchIndex: {
    screen: SearchIndex,
    navigationOptions: navigation => ({
      title: 'search index',
      headerTitle: props => <SearchHeader searchOn={true} {...navigation} />
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
    navigationOptions: () => ({
      title: 'Comments'
    })
  }
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
