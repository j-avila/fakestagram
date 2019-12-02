import { createStackNavigator } from 'react-navigation-stack';
import Home from './home'
import Post from './post'
import User from './profile'
import Comments from './comments'

const Stack = createStackNavigator
const HomeStackNav = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator> 
)

export default HomeStackNav  