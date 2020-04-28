import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  TouchableHighlightBase
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Avatar from '../shared/avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { surface } from './colors'

export default PostItem = props => {
  const { data, profileRoute, commentsRoute, authorMeta, currentUser } = props
  // console.log('post id: ', data.key)
  const { width } = Dimensions.get('window')
  const obj = JSON.stringify(authorMeta)
  const author = JSON.parse(obj)
  const [like, setLike] = useState(false)

  const likeAction = async (key, user, like) => {
    await setLike(!like)
    props.handleLike(key, user, !like)
  }

  const likesCount = () => {
    const likesObj = props.data.likes
    const likesArr = () => {
      const result = []
      const likes = likesObj && Object.entries(likesObj)
      likes &&
        likes.forEach(([key, value]) => result.push({ id: key, like: value }))
      return result
    }

    const testArr = likesArr()
    const test = testArr.filter(i => i.like == true && i.id != currentUser)
    const likesTotal = test.length
    // console.log('result', test)
    return likesTotal
  }

  return (
    <View style={styles.item}>
      <View style={styles.title}>
        <Avatar
          image={{ uri: author.avatar }}
          size={{ height: 40, width: 40 }}
        />
        <TouchableOpacity onPress={profileRoute}>
          <Text style={styles.titleTxt}>{author.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: data.image }}
          resizeMode="cover"
          style={{ width: width, height: width }}
        />
      </View>
      <View style={styles.meta}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => likeAction(data.key, currentUser, like)}
          >
            <Ionicons
              name={like ? 'md-heart' : 'md-heart-empty'}
              size={32}
              color={like ? 'tomato' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={commentsRoute}>
            <Ionicons name="md-chatbubbles" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ textAlign: 'left', fontWeight: 'bold', marginVertical: 5 }}
        >
          <Text>{likesCount()} likes</Text>
        </TouchableOpacity>
        <Text
          key={data.post.description}
        >{`${author.name} : ${data.post.description}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: surface,
    marginVertical: 8,
    paddingBottom: 15
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20,
    paddingVertical: 12,
    alignSelf: 'center'
  },
  meta: {
    flex: 1,
    padding: 10
  },
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  titleTxt: {
    fontWeight: '900',
    fontSize: 18
  }
})
