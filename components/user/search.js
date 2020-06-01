import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import GridItem from '../shared/gridItem'
import { getExploreFeed } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const dumb = [
  {
    id: 1,
    image: 'https://picsum.photos/200',
    route: 'image'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200',
    route: 'image'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200',
    route: 'image'
  }
]

const Search = props => {
  const { navigation } = props
  const exploreFeed = useSelector(state => state.exploreFeed)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExploreFeed())
  }, [])

  useEffect(() => {}, [exploreFeed])

  return (
    <View style={styles.body}>
      <GridItem data={exploreFeed} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e3d4'
  },
  button: {
    marginBottom: 10
  }
})

export default Search
