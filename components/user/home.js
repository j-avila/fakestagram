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
import { GET_POSTS } from '../../store/actions/types'
import { getPosts } from '../../store/actions/actions'
import postItem from './postItem'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      timelineLocal: [],
      isFetching: false
    }
  }

  onRefresh = async () => {
    await this.props.handleGetPosts()
    this.setState({
      timelineLocal: this.props.timeline
    })
    console.log('timeline: fetched', this.props.timeline)
  }

  async componentDidMount() {
    this.onRefresh()
  }

  render() {
    const { navigation, timeline, authors } = this.props
    const { isFetching, timelineLocal } = this.state
    // console.log(this.props)
    return (
      <SafeAreaView style={styles.body}>
        <Button title="actualizar" onPress={() => this.onRefresh()} />
        {timelineLocal && authors.length > 1 && timelineLocal.length >= 1 ? (
          <FlatList
            data={timelineLocal}
            refreshing={isFetching}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => (
              <PostItem
                data={item}
                authorMeta={authors[index]}
                profileRoute={() => navigation.navigate('Profile')}
                commentsRoute={() => navigation.navigate('Comments')}
              />
            )}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>nothing to see here</Text>
        )}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    timeline: state.setTimelineHandler,
    authors: state.setAuthorsHandler
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetPosts: () => {
    dispatch(getPosts())
  }
})

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#e0e3d4'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
