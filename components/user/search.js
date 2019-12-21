import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class Search extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.body}>
        <Text> textInComponent search </Text>
        <Button
          style={styles.button} 
          title=' go to profile' 
          onPress={ () => {navigation.navigate('Profile')} }
        />
        <Button
          style={styles.button} 
          title=' go to post' 
          onPress={ () => {navigation.navigate('Post')} }
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
  },
  button: {
    marginBottom: 10
  }
})
