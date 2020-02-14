import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  TouchableHighlightBase
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { auth } from 'firebase'

export default PostItem = props => {
  const { data, profileRoute, commentsRoute, authorMeta } = props
  const { width } = Dimensions.get('window')
  const obj = JSON.stringify(authorMeta)
  const author = JSON.parse(obj)
  return (
    <View style={styles.item}>
      <View style={styles.title}>
        <Image style={styles.avatar} source={{ uri: author.avatar }} />
        <TouchableHighlight onPress={profileRoute}>
          <Text style={styles.titleTxt}>{author.name}</Text>
        </TouchableHighlight>
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
          <TouchableHighlight style={styles.icon}>
            <Text>Like</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.icon} onPress={commentsRoute}>
            <Text>Comments</Text>
          </TouchableHighlight>
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
    marginRight: 10,
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
    fontWeight: 'bold',
    fontSize: 18
  }
})
