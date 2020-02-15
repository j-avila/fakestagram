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
import {
  setPostImg,
  setCreatePost,
  getPosts
} from '../../store/actions/actions'
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

  handleCreatePost = async (post, postPic, uid) => {
    // console.log('to post: ', image)
    await this.props.setPost(post.values, postPic.image, uid)
    this.props.navigation.navigate('Home')
    this.props.updateTimeline()
  }

  render() {
    const { navigation } = this.props
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
            uid={this.props.userData.uid}
            handleSubmit={this.handleCreatePost}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    imageObj: state.postImg,
    post: state.form.createPost,
    postPrev: state.createPost,
    userData: state.sessionHandler
  }
}

const mapDispatchToProps = dispatch => ({
  setImg: image => {
    dispatch(setPostImg(SET_POST_PHOTO, image))
  },
  delImg: () => {
    dispatch(setPostImg(REMOVE_POST_PHOTO))
  },
  setPost: (post, image, userData) => {
    dispatch(
      setCreatePost(CREATE_POST, {
        postDesc: post,
        userID: userData,
        imgUrl: image
      })
    )
  },
  updateTimeline: () => {
    dispatch(getPosts())
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
