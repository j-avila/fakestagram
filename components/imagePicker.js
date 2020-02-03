import * as React from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableHighlight } from 'react-native-gesture-handler';

class ImagePickerComp extends React.Component {
  state = {
    image: null,
  }

  render() {
    let { image } = this.state;
    let { imageObj, radius, avatarSize } = this.props
    const radiusImg = { borderRadius: radius ? 100 : 0}
    const aspectRatio = { width: avatarSize ? 200 : 400, height: avatarSize ? 200 : 400 }
    // console.log(image)

    return (
      <View style={{ flex: 3, alignItems: 'center' }}>
       <TouchableHighlight onPress={this._pickImage}>
          {image ?
            <Image source={{ uri: imageObj }} style={{...aspectRatio, ...radiusImg}} />
          :
            <Image source={require('../assets/upload_media.png')} style={{...aspectRatio, ...radiusImg}} />
          }
       </TouchableHighlight>
        {image &&
          <TouchableHighlight style={styles.delete} onPress={this.props.removeImg}>
            <Text>Delete avatar</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  componentDidUpdate(prevProps) {
    prevProps.imageObj !== this.props.imageObj &&
    this.setState({
      image: this.props.imageObj
    })
  }
  

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if(result.uri){
      this.props.action(result.uri)
    } else {
      this.props.action(null)
    }

    if (!result.cancelled) {
      this.setState({ image: result ? result.uri : null });
    } 
  };
}

export default ImagePickerComp

const styles = StyleSheet.create({
  delete: {
    marginVertical: 0
  }
})