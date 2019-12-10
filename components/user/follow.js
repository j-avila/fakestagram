import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Follow extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Text> textInComponent  follow</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  }
})
