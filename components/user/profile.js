import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Avatar from '../shared/avatar'
import PostsGrid from '../shared/postsGrid'
export default class Profile extends Component {
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

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.body}>
        <View style={styles.pic}>
          <View style={styles.picHolder}>
            <Avatar size={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={styles.txtTitles}>perfil</Text>
            {/*  <TouchableHighlight
              onPress={() => {
                authService.signOut()
              }}
            >
              <Text>Sign out</Text>
            </TouchableHighlight> */}
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
