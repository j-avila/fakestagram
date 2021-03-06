import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableHighlight, FlatList } from 'react-native-gesture-handler'

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns)

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow++
  }

  return data
}

const GridItem = ({ item, index }) => {
  return item.empty ? (
    <View style={[styles.item, styles.itemInvisible]} />
  ) : (
    <View style={styles.item}>
      <TouchableHighlight>
        <Image style={styles.thumb} source={{ uri: item.image }} />
        {/* <Text style={styles.itemText}>{item.key}</Text> */}
      </TouchableHighlight>
    </View>
  )
}

const numColumns = 3
const PostsGrid = props => {
  const [loading, setLoading] = useState(false)
  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(props.data, numColumns)}
        style={styles.container}
        renderItem={GridItem}
        numColumns={numColumns}
        refreshing={loading}
        onRefresh={() => setLoading(!loading)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    overflow: 'visible'
    // marginVertical: 20
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns // approximate a square
  },
  thumb: {
    width: Dimensions.get('window').width / numColumns,
    height: Dimensions.get('window').width / numColumns
  },
  itemInvisible: {
    backgroundColor: 'transparent'
  }
})

export default PostsGrid
