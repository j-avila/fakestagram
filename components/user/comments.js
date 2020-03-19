import React, { useState, useEffect, useCallback } from 'React'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Comment from '../shared/comment'
import {
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-navigation'
import { setComments, fetchCommentsStream } from '../../store/actions/actions'
import { GET_COMMENTS, SET_COMMENTS } from '../../store/actions/types'

const genId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15)

const Comments = props => {
  initialState = ''
  const currentUser = useSelector(state => state.sessionHandler.uid)
  const usersList = useSelector(state => state.setAuthorsHandler)
  const commentsStream = useSelector(state => state.commentsStream)
  const [load, setLoad] = useState(false)
  const [stream, setStream] = useState([])
  const [message, setMessage] = useState(initialState)
  const dispatch = useDispatch()
  const { params } = props.navigation.state

  const messageHandler = e => {
    let typed = e.nativeEvent.text
    setMessage(typed)
  }

  const handleCommentMessage = (comment, currentUser, postId) => {
    // console.log('send: ', comment, currentUser, postId)
    let timeStamp = Date.now()
    console.log('click, click at: ', timeStamp)
    dispatch(
      setComments({
        type: SET_COMMENTS,
        payload: {
          id: genId(),
          postId: postId,
          user: currentUser,
          message: comment,
          date: timeStamp
        }
      })
    )
  }

  const getUserName = (list, id) => {
    const uList = list.filter(user => user.id === id)
    console.log(list, id)
    return uList
  }

  const getCommentsStream = id => {
    dispatch(fetchCommentsStream({ type: GET_COMMENTS, postId: id }))
  }

  useEffect(() => {
    getCommentsStream(params.postId)
    // console.log(usersList)
    if (stream.current) {
      setStream(commentsStream)
    }
  }, [])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior="padding"
      style={styles.body}
      enabled
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.list}>
          {commentsStream.length >= 1 ? (
            <FlatList
              data={commentsStream}
              refreshing={load}
              onRefresh={() => setLoad(true)}
              renderItem={({ item, index }) => {
                return (
                  <Comment
                    currentUser={currentUser}
                    name={item.userName}
                    id={item.id}
                    user={item.user}
                    userName={item.userName}
                    avatar={item.avatar}
                    text={item.message}
                    date={item.date}
                    responses={item.responses}
                  />
                )
              }}
            />
          ) : (
            <>
              <Text>loading</Text>
              <Button
                title="get"
                onPress={() => getCommentsStream(params.postId)}
              />
            </>
          )}
        </View>
        <View style={styles.commentArea}>
          <TextInput
            multiline={true}
            numberOfLines={1}
            style={styles.commentInput}
            onChange={e => messageHandler(e)}
            placeholder="escribe un comentario"
          />
          <TouchableOpacity
            onPress={() => {
              console.log(params.postId)
              handleCommentMessage(message, currentUser, params.postId)
            }}
          >
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
