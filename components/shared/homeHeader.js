import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const HomeHeader = () => {
  return (
    <View>
      <Image source={require('../../assets/camera.png')} />
      <Image source={require('../../assets/letter-logo.png')} />
      <Image source={require('../../assets/search.png')} />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  head: {
    justifyContent: 'space-around'
  }
})
