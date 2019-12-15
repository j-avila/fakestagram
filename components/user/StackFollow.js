import { createStackNavigator } from 'react-navigation-stack'
import TabFollow from './TabFollow'
import Profile from './profile'

const StackFollow = createStackNavigator({
	TabFollow: {
		screen: TabFollow,
		navigationOptions: () => {
			title: 'Follow'
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: () => {
			title: 'Profile'
		}
	},
},{
	defaultNavigationOptions: {
		title: 'Actividad',
		mode: 'card',
		headerTintColor: '#000',
		headerStyle:{
			backgroundColor: '#fff'
		}
	}
})

export default StackFollow