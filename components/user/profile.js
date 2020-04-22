import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Avatar from '../shared/avatar'
import PostsGrid from '../shared/postsGrid'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../store/actions'
import LinkButton from '../shared/linkButton'

/* statics = [
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
] */

const genStatics = (objfollowers, objFollowings, objPosts) => {
  const arrFollows = Object.entries(objfollowers)
  const arrFollowings = Object.entries(objFollowings)

  const follows = {
    title: 'seguidores',
    value: arrFollows.length
  }
  const followings = {
    title: 'seguidos',
    value: arrFollowings.length
  }
  const posts = {
    title: 'posts',
    value: objPosts.length
  }
  console.log('posts === ', posts)
  const result = [posts, follows, followings]
  return result
}

const Profile = props => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.setProfileData)
  const { navigation } = props
  const { id } = props.navigation.state.params

  // states
  const [statics, setStatics] = useState([])

  const getUsers = async id => {
    dispatch(getProfile(id))
    const stats = genStatics(
      profile.user.followers,
      profile.user.following,
      profile.posts
    )
    setStatics(stats)
  }

  useEffect(() => {
    getUsers(id)
  }, [])

  const { user, posts } = profile

  return (
    <View style={styles.body}>
      {profile.user ? (
        <>
          <View style={styles.pic}>
            <View style={styles.picHolder}>
              <Avatar
                size={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  ...styles.thumb
                }}
                image={{
                  uri: user.avatar
                }}
              />
              <Text style={styles.txtTitles}>{user.name}</Text>
            </View>
            <View style={styles.statics}>
              {statics &&
                statics.map((data, index) => (
                  <View key={index}>
                    <Text style={{ ...styles.txtTitles, ...styles.txtStatic }}>
                      {data.value}
                    </Text>
                    <Text style={(styles.txtTitles, styles.txtStatic)}>
                      {data.title}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <View style={styles.bio}>
            <Text>{user.bio}</Text>
            <Text>{user.category}</Text>
            {/* <Text style={styles.link}>{user.url}</Text> */}
            <LinkButton
              styles={styles.link}
              url={user.url}
              title={user.url}
              type="touchable"
            />
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
      {profile.posts ? (
        <PostsGrid data={posts} navFunc={() => navigation.navigate('Post')} />
      ) : (
        <View>
          <Text>loading</Text>
        </View>
      )}
    </View>
  )
}

export default Profile

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
  thumb: {
    borderWidth: 2,
    borderColor: '#005266',
    backgroundColor: 'black',
    marginBottom: 8
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
