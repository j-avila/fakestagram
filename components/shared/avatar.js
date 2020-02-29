import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Avatar = props => {
  const { size, image } = props
  return (
    <View>
      <Image style={{ ...styles.avatar, ...size }} source={{ ...image }} />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20
  }
})

export default Avatar
