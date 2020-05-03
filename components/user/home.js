import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  FlatList
} from 'react-native'
import { getPosts, setLike } from '../../store/actions'
import PostItem from '../shared/postItem'
import { Ionicons } from '@expo/vector-icons'
import { background } from '../shared/colors'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      timelineLocal: [],
      authorsLocal: {},
      isFetching: false
    }
  }

  updateLine = () => {
    this.setState({ isFetching: true })
    setTimeout(() => {
      this.setState({ isFetching: false })
    }, 500)
    console.log('updated')
  }

  onRefresh = async () => {
    this.setState({ isFetching: true })
    await this.props.handleGetPosts()
    this.setState({ isFetching: false })
  }

  userlike = async (postId, userId, like) => {
    const likeObj = {
      [postId]: {
        [userId]: like
      }
    }

    await this.props.handleLike({ postId, userId, like })
  }

  async componentDidMount() {
    await this.onRefresh()
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('loading? ', this.props.loading)
    this.state.timelineLocal != this.props.timeline &&
      this.setState({
        timelineLocal: this.props.timeline,
        authorsLocal: this.props.authorMeta
      })
  }

  render() {
    const { navigation, timeline, authors, loading, currentUser } = this.props
    const { timelineLocal, isfetching, authorsLocal } = this.state
    // console.log('home: ', currentUser)
    return (
      <SafeAreaView style={styles.body}>
        {authors.length >= 1 && timeline.length >= 1 ? (
          <FlatList
            data={timeline}
            refreshing={loading}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => (
              <PostItem
                currentUser={currentUser}
                data={item}
                authorMeta={authors[index]}
                profileRoute={() =>
                  navigation.navigate('Profile', { id: item.userId })
                }
                commentsRoute={() =>
                  navigation.navigate('Comments', {
                    currentUser: currentUser,
                    postId: item.key
                  })
                }
                handleLike={this.userlike}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="md-compass" size={200} color="teal" />
            <Text style={{ textAlign: 'center' }}>nothing to see here</Text>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.sessionHandler.uid,
    timeline: state.setTimelineHandler,
    authors: state.setAuthorsHandler,
    loading: state.isfetching
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetPosts: () => {
    dispatch(getPosts())
  },
  handleLike: data => {
    dispatch(setLike(data))
  }
})

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: background
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
