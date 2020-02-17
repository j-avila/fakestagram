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
  const { data, profileRoute, commentsRoute, authorMeta } = props
  const { width } = Dimensions.get('window')
  const obj = JSON.stringify(authorMeta)
  const author = JSON.parse(obj)
  const [like, setLike] = useState(false)

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
          <TouchableOpacity style={styles.icon} onPress={() => setLike(!like)}>
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
    marginVertical: 8
  },
  actions: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    marginRight: 20,
    paddingVertical: 12
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
