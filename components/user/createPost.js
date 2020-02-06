import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from '../imagePicker'
import { setPostImg, setCreatePost } from '../../store/actions/actions'
import {
  SET_POST_PHOTO,
  REMOVE_POST_PHOTO,
  CREATE_POST
} from '../../store/actions/types'
import PostForm from './postForm'
import CameraPicker from './cameraPickerExpo'

class CreatePost extends Component {
  constructor() {
    super()
  }

  handleCreatePost = (post, postPic) => {
    // console.log('to post: ', image)
    this.props.setPost(post.values, postPic.image)
  }

  render() {
    const { gallery, navigation, imageObj, postPrev } = this.props
    const navProps = JSON.stringify(navigation.getParam('gallery'))

    return (
      <View style={styles.body}>
        <KeyboardAvoidingView styles={styles.holder} behavior="padding" enabled>
          {navProps ? (
            <ImagePicker
              type="text"
              imageObj={this.props.imageObj.image}
              action={this.props.setImg}
              removeImg={this.props.delImg}
            />
          ) : (
            <CameraPicker
              imageObj={this.props.imageObj.image}
              action={this.props.setImg}
              removeImg={this.props.delImg}
            />
          )}
          <PostForm
            image={this.props.imageObj}
            post={this.props.post}
            handleSubmit={this.handleCreatePost}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  // console.log('state of create:', state);
  return {
    imageObj: state.postImg,
    post: state.form.createPost,
    postPrev: state.createPost
  }
}

const mapDispatchToProps = dispatch => ({
  setImg: image => {
    dispatch(setPostImg(SET_POST_PHOTO, image))
  },
  delImg: () => {
    dispatch(setPostImg(REMOVE_POST_PHOTO))
  },
  setPost: (post, image) => {
    dispatch(setCreatePost(CREATE_POST, { postDesc: post, imgUrl: image }))
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)