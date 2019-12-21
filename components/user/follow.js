<<<<<<< HEAD
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
=======
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
>>>>>>> fb7fe8e0dd49107c4c11e8aba5ef4b6e390c196a
