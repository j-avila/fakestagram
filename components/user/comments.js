import React, { useState, useEffect } from 'React'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useSelector } from 'react-redux'
import Comment from '../shared/comment'
import {
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { withOrientation, SafeAreaView } from 'react-navigation'

const commentsDummy = [
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  },
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  },
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  },
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  },
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  },
  {
    name: 'pablo la chingada',
    comment: 'hijos de la chingada, chiguense ya',
    id: 123456788,
    reposnses: []
  }
]

const Comments = props => {
  initialState = ''
  const user = useSelector(state => state.sessionHandler.email)
  const [load, setLoad] = useState(false)
  const [message, setMessage] = useState(initialState)

  const messageHandler = e => {
    let typed = e.nativeEvent.text
    setMessage(typed)
  }

  const handleCommentMessage = comment => {
    console.log('send: ', comment)
  }

  console.log(user)
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior="padding"
      style={styles.body}
      enabled
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.list}>
          <FlatList
            data={commentsDummy}
            refreshing={load}
            onRefresh={() => setLoad(true)}
            renderItem={({ item, index }) => (
              <Comment
                username={item.name}
                id={item.id}
                text={item.comment}
                responses={item.responses}
              />
            )}
          />
        </View>
        <View style={styles.commentArea}>
          <TextInput
            multiline={true}
            numberOfLines={1}
            style={styles.commentInput}
            onChange={e => messageHandler(e)}
            placeholder="escribe un comentario"
          />
          <TouchableOpacity onPress={() => handleCommentMessage(message)}>
            <Ionicons name="md-send" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
    // flexDirection: 'column'
    // justifyContent: 'center',
    // alignItems: 'stretch'
  },
  list: {
    flex: 14,
    flexBasis: 100
  },
  commentArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#35363a'
  },
  commentInput: {
    flex: 1,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginRight: 10
  }
})

export default Comments
