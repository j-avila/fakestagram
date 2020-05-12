import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import {
  SET_POST_PHOTO,
  REMOVE_POST_PHOTO,
  CREATE_POST
} from '../../store/actions/types'
import PostForm from './postForm'
import CameraPicker from './cameraPickerExpo'
import ImagePicker from '../shared/imagePicker'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, setPostImg, setCreatePost } from '../../store/actions'

const Add = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [type, setStype] = useState('camera')
  const imageObj = useSelector(state => state.postImg)
  const post = useSelector(state => state.form.createPost)
  const postPrev = useSelector(state => state.createPost)
  const userData = useSelector(state => state.sessionHandler)
  const updateTimeline = dispatch(getPosts())

  const setImg = image => {
    dispatch(setPostImg(SET_POST_PHOTO, image))
  }
  const delImg = () => {
    dispatch(setPostImg(REMOVE_POST_PHOTO))
  }
  const setPost = (post, image, userData) => {
    dispatch(
      setCreatePost(CREATE_POST, {
        postDesc: post,
        userID: userData,
        imgUrl: image
      })
    )
  }
  const handleCreatePost = async (post, postPic, uid) => {
    await setPost(post.values, postPic.image, uid)
    navigation.navigate('Home')
    updateTimeline()
  }

  const switchType = async type => {
    await setStype(type)
    imageObj.image && delImg()
  }

  return (
    <View style={styles.body}>
      <KeyboardAvoidingView styles={styles.holder} behavior="padding" enabled>
        {type === 'picker' ? (
          <>
            <ImagePicker
              type="text"
              imageObj={imageObj.image}
              action={setImg}
              removeImg={delImg}
            />
            <TouchableHighlight onPress={() => delImg()}>
              <Text>quitar imagen</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => switchType('')}>
              <Text>usar camara</Text>
            </TouchableHighlight>
          </>
        ) : (
          <CameraPicker
            imageObj={imageObj.image}
            action={setImg}
            removeImg={delImg}
          />
        )}
        {imageObj.image ? (
          <PostForm
            image={imageObj}
            post={post}
            uid={userData.uid}
            handleSubmit={handleCreatePost}
          />
        ) : (
          <View>
            <TouchableHighlight onPress={() => switchType('picker')}>
              <Text>elegir de la galeria</Text>
            </TouchableHighlight>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 3,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  holder: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFF'
  }
})

export default Add
