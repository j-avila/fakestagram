import React, { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import {
  SET_POST_PHOTO,
  REMOVE_POST_PHOTO,
  CREATE_POST
} from '../../store/actions/types'
import CameraPicker from './cameraPickerExpo'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, setPostImg, setCreatePost } from '../../store/actions'
import PostEditor from './postEditor'

const Add = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [type, setStype] = useState('camera')
  const imageObj = useSelector(state => state.postImg)
  const post = useSelector(state => state.form.createPost)
  const postPrev = useSelector(state => state.createPost)
  const userData = useSelector(state => state.sessionHandler)
  const updateTimeline = dispatch(getPosts())

  const setImg = image => dispatch(setPostImg(SET_POST_PHOTO, image))
  const delImg = () => dispatch(setPostImg(REMOVE_POST_PHOTO))

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

  useEffect(() => {
    console.log('redux image', imageObj)
  }, [imageObj])

  return (
    <View style={styles.body}>
      {imageObj.image ? (
        <PostEditor
          imageObj={imageObj}
          post={post}
          userData={userData}
          actionCreate={handleCreatePost}
          actionDiscard={delImg}
          actionFlash={switchType}
        />
      ) : (
        <CameraPicker
          imageObj={imageObj.image}
          action={setImg}
          removeImg={delImg}
        />
      )}
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
