import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { authService } from '../../store/servicios/firebase'

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
        <TouchableHighlight onPress={ () => { authService.signOut() } }>
          <Text>Sign out</Text>
        </TouchableHighlight>
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
