import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Avatar = props => {
  const { size, image } = props
  return (
    <View>
      {image ? (
        <Image style={{ ...styles.avatar, ...size }} source={{ ...image }} />
      ) : (
        <Image
          style={{ ...styles.avatar, ...size }}
          source={require('../../assets/default_user.png')}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20
  }
})

export default Avatar
