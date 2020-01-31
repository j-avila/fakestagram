import { createStackNavigator } from 'react-navigation-stack';
import Add from './add';
import CreatePost from './createPost';

const StackAdd = createStackNavigator({
  Add:{
    screen: Add,
    navigationOptions: ({navigation}) => {
      title: 'Add'
    }
  },
  Selection: CreatePost,
  navigationOptions: () => {
    title: 'Select a photo from gallery'
  }
})


StackAdd.navigationOptions = ({navigation}) => { 
	let tabBarVisible = true
	const screenRoutes = navigation.state
	const excludeRoute = screenRoutes.routes.filter( item => item.routeName === 'Add')[0]

	excludeRoute && excludeRoute.routeName === 'Add' ? tabBarVisible = false  : false
	// console.log(screenRoutes, excludeRoute)
	return {tabBarVisible}
}

export default StackAdd