import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default class Add extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.body}>
        <Text>add</Text>
        <Button
          title="take a photo"
          onPress={() => {navigation.navigate('Add')}}
        />
       <TouchableHighlight onPress={() => {navigation.navigate('Selection')}}>
        <Text>or select from gallery</Text>
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
