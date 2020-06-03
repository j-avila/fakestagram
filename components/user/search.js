import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import GridItem from '../shared/gridItem'
import { getExploreFeed } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { background } from '../shared/colors'

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

const { height } = Dimensions.get('window')

const Search = props => {
  const { navigation } = props
  const exploreFeed = useSelector(state => state.exploreFeed)
  const dispatch = useDispatch()
  const [screenHeight, setHeight] = useState(0)

  const onChangeSize = (contentWidth, contentHeight) => {
    setHeight(contentHeight)
  }

  useEffect(() => {
    dispatch(getExploreFeed())
  }, [])

  const scrollEnabled = screenHeight > height

  return (
    <ScrollView>
      <GridItem data={exploreFeed} />
      <GridItem data={exploreFeed} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background
  },
  button: {
    marginBottom: 10
  }
})

export default Search
