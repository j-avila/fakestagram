import * as React from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { SET_AVATAR, DELETE_AVATAR } from '../store/actions/types';
import { setAvatar } from '../store/actions/actions';

class ImagePickerComp extends React.Component {
  state = {
    image: null,
  }

  render() {
    let { image } = this.state;
    let { imageObj, radius, avatarSize } = this.props
    const radiusImg = { borderRadius: radius ? 100 : 0}
    const aspectRatio = { width: avatarSize ? 200 : 500, height: avatarSize ? 200 : 400 }
    // console.log(this.props)

    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
       <TouchableHighlight onPress={this._pickImage}>
          {image ?
            <Image source={{ uri: imageObj }} style={{...aspectRatio, ...radiusImg}} />
          :
            <Image source={require('../assets/default_user.png')} style={{...aspectRatio, ...radiusImg}} />
          }
       </TouchableHighlight>
        {image &&
          <TouchableHighlight style={styles.delete} onPress={this._deleteImage}>
            <Text>Delete avatar</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _deleteImage = async () => {
    this.props.deleteAvatar()
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    // console.log('imgObj: ', result)

    if(result.uri){
      this.props.action(result.uri)
    } else {
      this.props.action(null)
    }
    // console.log('redux: ', this.props);

    if (!result.cancelled) {
      this.setState({ image: result ? result.uri : null });
    } 
  };
}

export default ImagePickerComp

const styles = StyleSheet.create({
  delete: {
    marginVertical: 20
  }
})