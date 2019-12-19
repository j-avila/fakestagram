import React from 'react'
import { View, Text, Button } from 'react-native';
import {bindActionCreators} from 'redux'
import { useSelector, useDispatch } from 'react-redux'

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
      <Button title="atras" onPress={() => navigation.goBack()}/>
      <Text> sign up </Text>
			<Button title='aumentar' onPress={aumentar} />
    </View>
  )
}

export default NoSigned 

/* const mapStateToProps = (state) => ({
	number: state.defaultReducer
}) 
 
const mapDisaptchToProps = dispatch => (
	bindActionCreators({ 
		aumentar: () => { dispatch({type: 'AUMENTAR'}) }
	}, dispatch)
)

export default  connect(mapStateToProps, mapDisaptchToProps)(NoSigned) */