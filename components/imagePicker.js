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
    let { avatar } = this.props
    // console.log(avatar)

    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
       <TouchableHighlight onPress={this._pickImage}>
          {avatar ?
            <Image source={{ uri: avatar }} style={styles.thumb} />
          :
            <Image source={require('../assets/default_user.png')} style={styles.thumb} />
          }
       </TouchableHighlight>
        {avatar &&
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
      this.props.setAvatarImg(result.uri)
    } else {
      this.props.setAvatarImg(null)
    }
    // console.log('redux: ', this.props);

    if (!result.cancelled) {
      this.setState({ image: result ? result.uri : null });
    } 
  };
}

const mapStateToProps = state => ({
  ...state,
  avatar: state.setAvatar
})

const mapDispatchToProps = (dispatch) => ({
  setAvatarImg: (image) => { 
    dispatch(setAvatar(SET_AVATAR, image))
  },
  deleteAvatar: () => {
    dispatch(setAvatar(DELETE_AVATAR, null))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerComp)

const styles = StyleSheet.create({
  thumb: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  delete: {
    marginVertical: 20
  }
})