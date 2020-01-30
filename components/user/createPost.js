import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImagePicker from '../imagePicker'
import { setPostImg } from '../../store/actions/actions'
import { SET_POST_PHOTO } from '../../store/actions/types'

export class CreatePost extends Component {
  constructor() {
    super()
  }
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <View style={styles.body}>
        <Text> create a post </Text>
        <ImagePicker
         	 imageObj={this.props.image}
           action={this.props.setImg}
        />
        <Button
          title="Post this image"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  }
})

const mapStateToProps = (state) => ({
  ...state,
  image: state.setPostImg
})

const mapDispatchToProps = dispatch => ({
  setImg: (image) => {
    dispatch(setPostImg(SET_POST_PHOTO, image))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
