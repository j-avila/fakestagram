import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Avatar from '../shared/avatar'
import PostsGrid from '../shared/postsGrid'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../store/actions'

statics = [
  {
    title: 'posts',
    numbers: 12
  },
  {
    title: 'seguidores',
    numbers: 12
  },
  {
    title: 'seguidos',
    numbers: 12
  }
]

data = [
  { key: 'A' },
  { key: 'B' },
  { key: 'C' },
  { key: 'D' },
  { key: 'E' },
  { key: 'F' },
  { key: 'G' },
  { key: 'H' },
  { key: 'I' },
  { key: 'J' }
  // { key: 'K' },
  // { key: 'L' },
]

const Profile = props => {
  const dispatch = useDispatch()
  const getUserProfile = id => {
    dispatch(getProfile(id))
  }

  const [profile, setProfile] = useState({})
  const profileFetched = useSelector(state => state.setProfileData)
  const { navigation } = props
  useEffect(() => {
    getUserProfile('uTd7KULxZrMchtTdCcB0w1I0YEp2')
    setProfile(profileFetched)
  }, [])
  return (
    <View style={styles.body}>
      {/* {console.log(profileFetched)} */}
      {profileFetched.length > 1 ? (
        <>
          <View style={styles.pic}>
            <View style={styles.picHolder}>
              <Avatar
                size={{ width: 100, height: 100, borderRadius: 50 }}
                image={{
                  uri: profileFetched.user.avatar
                }}
              />
              <Text style={styles.txtTitles}>{profile.user.name}</Text>
            </View>
            <View style={styles.statics}>
              {statics &&
                statics.map((data, index) => (
                  <View key={index}>
                    <Text style={{ ...styles.txtTitles, ...styles.txtStatic }}>
                      {data.numbers}
                    </Text>
                    <Text style={(styles.txtTitles, styles.txtStatic)}>
                      {data.title}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.bio}>
            <Text> descripcion</Text>
            <Text>que haces?</Text>
            <Text style={styles.link}>http://enalce.com</Text>
            <Text>pepo, chivato y roberta le siguen...</Text>
          </View>
          <View style={styles.actions}>
            <TouchableHighlight style={styles.actionButs}>
              <Text>seguir</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButs}>
              <Text>mensaje</Text>
            </TouchableHighlight>
          </View>
        </>
      ) : (
        <View>
          <Text>loading</Text>
        </View>
      )}
      {profileFetched.length > 1 ? (
        <PostsGrid
          data={profileFetched.posts}
          navFunc={() => navigation.navigate('Post')}
        />
      ) : (
        <View>
          <Text>loading</Text>
        </View>
      )}
    </View>
  )
}

export default Profile

/* class Profile extends Component {
  statics = [
    {
      title: 'posts',
      numbers: 12
    },
    {
      title: 'seguidores',
      numbers: 12
    },
    {
      title: 'seguidos',
      numbers: 12
    }
  ]

  data = [
    { key: 'A' },
    { key: 'B' },
    { key: 'C' },
    { key: 'D' },
    { key: 'E' },
    { key: 'F' },
    { key: 'G' },
    { key: 'H' },
    { key: 'I' },
    { key: 'J' }
    // { key: 'K' },
    // { key: 'L' },
  ]

  

  async componentDidMount() {
    await this.props.handleProfileData()
  }

  componentDidUpdate(prevProps, prevState) {
    prevProps.userData != this.props.userData &&
      console.log('userData: ', this.props.userData)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.body}>
        <View style={styles.pic}>
          <View style={styles.picHolder}>
            <Avatar size={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={styles.txtTitles}>perfil</Text>
          </View>
          <View style={styles.statics}>
            {this.statics &&
              this.statics.map((data, index) => (
                <View key={index}>
                  <Text style={{ ...styles.txtTitles, ...styles.txtStatic }}>
                    {data.numbers}
                  </Text>
                  <Text style={(styles.txtTitles, styles.txtStatic)}>
                    {data.title}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bio}>
          <Text> descripcion</Text>
          <Text>que haces?</Text>
          <Text style={styles.link}>http://enalce.com</Text>
          <Text>pepo, chivato y roberta le siguen...</Text>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight style={styles.actionButs}>
            <Text>seguir</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.actionButs}>
            <Text>mensaje</Text>
          </TouchableHighlight>
        </View>
        <PostsGrid
          data={this.data}
          navFunc={() => navigation.navigate('Post')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.setProfileData
})

const mapDispatchToProps = dispatch => ({
  handleProfileData: () => {
    dispatch(getProfile('uTd7KULxZrMchtTdCcB0w1I0YEp2'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile) */

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#e0e3d4'
  },
  grid: {
    flex: 10,
    backgroundColor: 'grey'
  },
  pic: {
    flex: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10
  },
  actionButs: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 65,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#d6d6d6'
  },
  picHolder: {
    alignContent: 'center'
  },
  txtTitles: {
    textAlign: 'center'
  },
  link: {
    color: 'blue',
    paddingVertical: 4,
    textDecorationStyle: 'solid'
  },
  txtStatic: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  statics: {
    flex: 2,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  bio: {
    flex: 1,
    padding: 15,
    paddingVertical: 40
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
