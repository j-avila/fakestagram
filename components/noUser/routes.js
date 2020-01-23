import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NoSigned from '../userSign/signUp';
import SignIn from '../userSign/login';


const NoSignedRoutes = createStackNavigator({
  sign: {
    screen: SignIn,
    navigationOptions: () => ({
      title: 'hometo',
      header: null,
      headerBackTitle: null,
    })
  },
  signup: {
    screen: NoSigned, 
    navigationOptions: () => ({
      title: 'sign up',
      header: null  
    })
  }
})

export default createAppContainer(NoSignedRoutes);