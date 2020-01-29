import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImagePicker from '../imagePicker'
import { setPostImg } from '../../store/actions/actions'
import { SET_POST_PHOTO } from '../../store/actions/types'

export class CreatePost extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const  {loadImg, image} = this.props
    return (
      <View style={styles.body}>
        <Text> create a post </Text>
        <ImagePicker image={imageObj.image}  load={loadImg} />
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
  imageObj: this.state.setPostImg
})

const mapDispatchToProps = dispatch => ({
  loadImg: img => {
    dispatch(setPostImg(SET_POST_PHOTO, img))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
