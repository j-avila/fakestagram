import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Home from './home'
import Post from './post'
import User from './user'
import Comments from './comments'

const HomeStackNav = createMaterialTopTabNavigator({
    Home: Home,
    Post: Post,
    User: User,
    Comments: Comments 
})
 
export default HomeStackNav