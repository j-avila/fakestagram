import React from 'React'
import { View, StyleSheet, Text } from 'react-native'

const Comments = props => {

	return(
		<View style={styles.body}>
			<Text>comments screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default Comments