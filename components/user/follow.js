import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class Follow extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.body}>
        <Text> textInComponent  follow</Text>
        <Button
          title='Profile'
          onPress={ () => navigation.navigate('Profile')}
        />
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
