import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from '../imagePicker'
import { setPostImg } from '../../store/actions/actions'
import { SET_POST_PHOTO, REMOVE_POST_PHOTO } from '../../store/actions/types'
import PostForm from './postForm'
import { RNCamera } from 'react-native-camera'
import CameraPicker from './cameraPickerExpo'

class CreatePost extends Component {
  constructor() {
    super()
  }

  render() {
    const {gallery, navigation} = this.props
    const navProps = JSON.stringify(navigation.getParam('gallery'))

    return (
      <View style={styles.body}>
          <KeyboardAvoidingView styles={styles.holder} behavior="padding" enabled>
          {navProps ? 
            <ImagePicker
              type='text'
              imageObj={this.props.imageObj.image}
              action={this.props.setImg}
              removeImg={this.props.delImg}
            />
            :
            <CameraPicker
              imageObj={this.props.imageObj.image}
              action={this.props.setImg}
              removeImg={this.props.delImg}
            />
          }
            <PostForm />
          </KeyboardAvoidingView>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  // console.log('stateImg :',state.postImg)
  return ({
  imageObj: state.postImg
})}

const mapDispatchToProps = dispatch => ({
  setImg: (image) => {
      dispatch(setPostImg(SET_POST_PHOTO, image))
  },
  delImg: () => {
    dispatch(setPostImg(REMOVE_POST_PHOTO))
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
