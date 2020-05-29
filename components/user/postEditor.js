import React from 'react'
import { View, Image } from 'react-native'
import PostForm from './postForm'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Trash from '../../assets/trash.svg'

const PostEditor = props => {
  const { imageObj, userData, post, actionCreate, actionDiscard } = props
  return (
    <View>
      <View style={{ width: 400, hieght: 400, flex: 5 }}>
        {imageObj ? (
          <Image
            source={{ uri: imageObj.image }}
            style={{ width: 400, hieght: 400, flex: 5 }}
          />
        ) : (
          <Image
            source={require('../../assets/upload_media.png')}
            style={{ width: 400, hieght: 400, flex: 5 }}
          />
        )}
        <TouchableOpacity onPress={() => actionDiscard()}>
          <Trash height={35} width={35} fill="tomato" />
        </TouchableOpacity>
      </View>

      <PostForm
        image={imageObj}
        post={post}
        uid={userData.uid}
        handleSubmit={actionCreate}
      />
    </View>
  )
}

export default PostEditor
