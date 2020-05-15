import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import Shutter from '../../assets/shutter.svg'
import Flip from '../../assets/flip.svg'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  componentDidUpdate(prevProps) {
    prevProps.imageObj !== this.props.imageObj &&
      this.setState({
        image: this.props.imageObj
      })
  }

  snap = async () => {
    console.log('snap snap')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
      // console.log(photo)
      if (photo) {
        this.props.action(photo.uri)
      } else {
        this.props.action(null)
      }
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (result.uri) {
      this.props.action(result.uri)
    } else {
      this.props.action(null)
    }

    if (!result.cancelled) {
      this.setState({ image: result ? result.uri : null })
    }
  }

  render() {
    const { imageObj, aspectRatio, radiusImg } = this.props
    const { hasCameraPermission, image } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <>
          <View style={{ flex: 4, width: 400, height: 700 }}>
            <Text>im on camera view</Text>
            {!image ? (
              <Camera
                style={{ flex: 1 }}
                type={this.state.type}
                ratio="16:1"
                ref={ref => {
                  this.camera = ref
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'flex-end',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        // alignSelf: 'flex-end',
                        alignItems: 'center'
                      }}
                      onPress={() => {
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                        })
                      }}
                    >
                      <Flip style={{ marginBottom: 10, color: 'white' }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center'
                      }}
                      onPress={() => {
                        this.snap()
                      }}
                    >
                      {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> take picture </Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </Camera>
            ) : (
              <Image
                source={{ uri: imageObj }}
                style={{ ...aspectRatio, ...radiusImg, ...styles.thumb }}
              />
            )}
            {image && (
              <TouchableHighlight
                style={styles.delete}
                onPress={this.props.removeImg}
              >
                <Text style={styles.deleteTxt}>Discard image</Text>
              </TouchableHighlight>
            )}
          </View>
          <View>
            <Shutter onPress={() => this.snap()} />
            <TouchableHighlight
              onPress={this._pickImage}
              style={{ padding: 20 }}
            >
              <Text> Seleccionar de la galeria</Text>
            </TouchableHighlight>
          </View>
        </>
      )
    }
  }
}

const styles = StyleSheet.create({
  thumb: {
    flex: 1
  },
  delete: {
    padding: 10
  },
  deleteTxt: {
    textAlign: 'center'
  }
})
