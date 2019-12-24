import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import SingUpForm from './singUpForm';
import { TouchableHighlight } from 'react-native-gesture-handler';

const NoSigned = props => {
	const { navigation } = props
	const dispatch = useDispatch()
	const query = useSelector(state => state)

	const aumentar = (e) => {
		dispatch({type: 'AUMENTAR'})
		console.log(query)
	}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> sign up </Text>
			<SingUpForm styles={styles.form} />
			<TouchableHighlight onPress={() => navigation.goBack()}>
					<Text>Ya tienes una cuenta? ingresa</Text>
			</TouchableHighlight>
    </View>
  )
}

export default NoSigned 

const styles = StyleSheet.create({
	form: {
		marginVertical: 20
	}
})