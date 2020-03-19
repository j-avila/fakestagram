import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Avatar from '../shared/avatar'

const Comment = props => {
  const { avatar, name, text, id, responses } = props
  return (
    <View style={styles.body}>
      <Avatar image={{ uri: avatar }} size={{ height: 30, width: 30 }} />
      <View style={styles.comment}>
        <View style={StyleSheet.txt}>
          <Text style={styles.userName}>{name}</Text>
          <Text>{text}</Text>
        </View>
        <TouchableOpacity>
          <Text>Responder</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  comment: {
    marginVertical: 6,
    paddingHorizontal: 6,
    paddingVertical: 10
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default Comment
