import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class Profile extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.body}>
        <Text> textInComponent profile</Text>
        <Button
          title='Post'
          onPress={ () =>{
            navigation.navigate('Post')
          }}
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
