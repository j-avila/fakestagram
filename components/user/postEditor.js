import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import PostForm from './postForm'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Trash from '../../assets/trash.svg'

const PostEditor = props => {
  const { imageObj, userData, post, actionCreate, actionDiscard } = props
  return (
    <KeyboardAvoidingView styles={styles.holder} behavior="margin" enabled>
      <View style={{ width: 400, hieght: 400, flex: 5 }}>
        {imageObj ? (
          <Image
            source={{ uri: imageObj.image }}
            style={{ width: 400, hieght: 400, flex: 5, position: 'relative' }}
          />
        ) : (
          <Image
            source={require('../../assets/upload_media.png')}
            style={{
              width: 400,
              hieght: 400,
              flex: 5,
              zIndex: 0
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => actionDiscard()}
          style={styles.discardBut}
        >
          <Trash
            style={{ marginRight: 10 }}
            height={20}
            width={20}
            fill="white"
          />
          <Text style={{ color: 'white' }}>Descartar imagen </Text>
        </TouchableOpacity>
      </View>

      <PostForm
        image={imageObj}
        post={post}
        uid={userData.uid}
        handleSubmit={actionCreate}
      />
    </KeyboardAvoidingView>
  )
}

export default PostEditor

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  discardBut: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }
})
