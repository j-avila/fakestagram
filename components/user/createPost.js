import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImagePicker from '../imagePicker'
import { setPostImg } from '../../store/actions/actions'
import { SET_POST_PHOTO, REMOVE_POST_PHOTO } from '../../store/actions/types'

class CreatePost extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <View style={styles.body}>
        <Text> create a post </Text>
        <ImagePicker
         	 imageObj={this.props.imageObj.image}
           action={this.props.setImg}
           removeImg={this.props.delImg}
        />
        <Button
          title="Post this image"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  imageObj: state.postImg
})

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
