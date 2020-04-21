import React, { useCallback } from 'react'
import { Alert, Button, Linking, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const LinkButton = ({ url, title, styles, type }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }, [url])

  return type === 'button' ? (
    <Button style={styles} title={title} onPress={handlePress} />
  ) : (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles}>{title}</Text>
    </TouchableOpacity>
  )
}

export default LinkButton
