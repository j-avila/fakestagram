import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Post = props => {
  const { navigation } = props
  return (
    <View style={styles.body}>
      <Text>post screen</Text>
      <Button
        title="Comments"
        onPress={() => {
          navigation.navigate('Comments')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  }
})

export default Post
