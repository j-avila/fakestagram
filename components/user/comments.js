import React, { useState } from 'React'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Comment from '../shared/comment'
import {
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

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
  const user = useSelector(state => state.sessionHandler.email)
  const [load, setLoad] = useState(false)

  console.log(user)
  return (
    <View style={styles.body}>
      <FlatList
        style={styles.list}
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
      <View style={styles.commentArea}>
        <TextInput
          multiline={true}
          numberOfLines={1}
          style={styles.commentInput}
          placeholder="escribe un comentario"
        />
        <TouchableOpacity>
          <Ionicons name="md-send" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  list: {
    flex: 9
  },
  commentArea: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: '#d0d0d0',
    borderTopColor: '#35363a'
  },
  commentInput: {
    flex: 2,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    marginRight: 8
  }
})

export default Comments
