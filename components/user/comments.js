import React from 'React'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

const Comments = props => {
  const user = useSelector(state => state.sessionHandler.email)

  console.log(user)
  return (
    <View style={styles.body}>
      <Text>comments screen {user}</Text>
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
