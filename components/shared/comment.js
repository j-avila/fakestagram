import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Avatar from '../shared/avatar'

const Comment = props => {
  const { image, username, text, id, responses } = props
  return (
    <KeyboardAvoidingView styles={styles.body} behavior="padding" enabled>
      <View style={styles.comment}>
        <Avatar image={image} size={{ height: 20, width: 20 }} />
        <View style={StyleSheet.txt}>
          <Text style={styles.userName}>{username}</Text>
          <Text>{text}</Text>
        </View>
        <TouchableOpacity>
          <Text>Responder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  comment: {
    marginVertical: 8,
    padding: 5,
    borderWidth: 1
  },
  userName: {
    fontWeight: 'bold'
  }
})

export default Comment
