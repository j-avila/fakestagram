import { createStackNavigator } from 'react-navigation-stack';
import Add from './add';
import { CreatePost } from './createPost';

const StackAdd = createStackNavigator({
  Add:{
    screen: Add,
    navigationOptions: () => {
      title: 'Add'
    }
  },
  Selection: CreatePost,
  navigationOptions: () => {
    title: 'Select a photo from gallery'
  }
})


export default StackAdd