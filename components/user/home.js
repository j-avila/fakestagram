import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

class Home extends Component {
  render() {
    const { navigation } = this.props
    // console.log(navigation)
    return (
      <View style={styles.body}>
        <Text>textInComponent home</Text>
        <Button
          title='go to profile'
          onPress={ () => {
            navigation.navigate('Profile')
          } 
        }
        />
        <Button
          title='view Comments'
          onPress={ () => {
            navigation.navigate('Comments')
          } 
        }
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
})

export default Home
