import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Text> textInComponent profile</Text>
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
