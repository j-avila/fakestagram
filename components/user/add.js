import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Add extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Text> textInComponent  add</Text>
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
