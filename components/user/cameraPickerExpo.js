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
import FlashIcon from '../shared/flashIcon'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    flashMode: 'off',
    aspectAviable: [],
    aspectRatio: '4:3'
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    // const ratios = await Camera.getSupportedRatiosAsync()
    this.setState({
      hasCameraPermission: status === 'granted'
      // aspectAviable: ratios
    })
  }

  async componentDidUpdate(prevProps) {
    prevProps.imageObj !== this.props.imageObj &&
      this.setState({
        image: this.props.imageObj
      })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      console.log(ratios)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  // camera actions
  snap = async () => {
    console.log('snap snap')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
      // console.log(photo)
      if (photo) {
        console.log(photo)
        this.props.action(photo.uri)
      } else {
        this.props.action(null)
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

  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  flashSwitch = state => {
    const mode = state === 'off' ? 'on' : state === 'on' ? 'auto' : 'off'

    this.setState(
      {
        flashMode: mode
      },
      console.log('flash state', this.state.flashMode)
    )
  }

  changeAspect = param => {
    this.setState(
      {
        aspectRatio: param
      },
      () => console.log(this.state.aspectRatio)
    )
  }

  render() {
    const { imageObj, aspectRatio, radiusImg } = this.props
    const { hasCameraPermission, image, flashMode } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <>
          <View style={styles.viewer}>
            {!image ? (
              <Camera
                style={{ flex: 1 }}
                type={this.state.type}
                ratio={this.state.aspectRatio}
                flashMode={Camera.Constants.FlashMode[`${flashMode}`]}
                ref={ref => {
                  this.camera = ref
                }}
              >
                <View style={styles.viewerActions}>
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
                      style={styles.cameraAction}
                      onPress={() => this.flipCamera()}
                    >
                      <Flip
                        style={{
                          ...styles.cameraAction,
                          alignSelf: 'flex-start'
                        }}
                        height={styles.cameraAction.height}
                        width={styles.cameraAction.width}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cameraAction}
                      onPress={() => this.flashSwitch(flashMode)}
                    >
                      <FlashIcon
                        state={this.state.flashMode}
                        styles={{
                          ...styles.cameraAction,
                          alignSelf: 'flex-end'
                        }}
                      />
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
          <View style={styles.actionArea}>
            <View style={styles.aspectRatio}>
              <TouchableOpacity
                style={styles.aspectButton}
                onPress={() => {
                  this.changeAspect('4:3')
                }}
              >
                <Text>4:3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.aspectButton}
                onPress={() => {
                  this.changeAspect('16:9')
                }}
              >
                <Text>16:9</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.aspectButton}
                onPress={() => {
                  this.changeAspect('1:1')
                }}
              >
                <Text>1:1</Text>
              </TouchableOpacity>
            </View>
            <Shutter onPress={() => this.snap()} style={styles.shutter} />
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
  viewer: {
    flex: 3,
    width: 400,
    height: 400
  },
  viewerActions: {
    flex: 1,
    // width: 400,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  aspectButton: {
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  aspectRatio: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cameraAction: {
    flex: 1,
    width: 35,
    height: 35,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  actionArea: {
    flex: 2,
    paddingVertical: 20,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shutter: {
    marginTop: 40
  },
  delete: {
    padding: 10
  },
  deleteTxt: {
    textAlign: 'center'
  }
})
