import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, StyleSheet, View, Button } from 'react-native'
import { GET_POSTS } from '../../store/actions/types'
import { getPosts } from '../../store/actions/actions'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      timeline: []
    }
  }

  async componentDidMount() {
    await this.props.handleGetPosts()
    console.log(this.props.timeline)
  }

  render() {
    const { navigation } = this.props
    const { timeline } = this.state
    return (
      <View style={styles.body}>
        <Text>textInComponent home</Text>
        {timeline && timeline.length > 1 ? (
          timeline.map(post => (
            <>
              <Text key={post.post.description}>{post.post.description}</Text>
              <Button
                title="go to profile"
                onPress={() => {
                  navigation.navigate('Profile')
                }}
              />
              <Button
                title="view Comments"
                onPress={() => {
                  navigation.navigate('Comments')
                }}
              />
            </>
          ))
        ) : (
          <Text>no posts</Text>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('estado', state.getPostsHandler)
  return {
    timeline: state.getPostsHandler
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetPosts: () => {
    dispatch(getPosts(GET_POSTS))
  }
})

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
