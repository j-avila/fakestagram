import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Follow from './follow';

const TabFollow = createMaterialTopTabNavigator({
	Follows: {
		screen: Follow,
		navigatioOptions: () => {
			title: 'Follows'
		}
	},
	Followed: {
		screen: Follow,
		navigatioOptions: () => {
			title: 'Followed'
		}
	}
},{
	tabBarOptions: {
		headerTintColor: '#000',
		inactiveTintColor: '#969696',
		activeTintColor: '#000',
		style:{
			backgroundColor: '#fff',
		}
	}
})

export default TabFollow