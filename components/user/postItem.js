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
import { TouchableOpacity } from 'react-native-gesture-handler'

export default PostItem = props => {
  const { data, profileRoute, commentsRoute, authorMeta, currentUser } = props
  // console.log('autor: ', authorMeta)
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
        <Image style={styles.avatar} source={{ uri: author.avatar }} />
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
    backgroundColor: '#FFFFFF',
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
  avatar: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20
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
