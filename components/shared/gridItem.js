import React from 'react'
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width)

const FeatGrid = ({ pics, sided }) => {
  return (
    <View style={styles.grid}>
      {sided === 'left' && (
        <Image
          source={{ uri: pics[2].download_url }}
          resizeMode="cover"
          style={{ ...styles.largeThumb, order: 1 }}
        />
      )}
      <View style={{ flex: 2, order: 2 }}>
        <Image
          source={{ uri: pics[0].download_url }}
          resizeMode="cover"
          style={styles.thumb}
        />
        <Image
          source={{ uri: pics[1].download_url }}
          resizeMode="cover"
          style={styles.thumb}
        />
      </View>
      {sided === 'right' && (
        <Image
          source={{ uri: pics[2].download_url }}
          resizeMode="cover"
          style={{ ...styles.largeThumb, order: 1 }}
        />
      )}
    </View>
  )
}

const Grid = props => {
  const { data } = props
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      {data.map(item => (
        <Image source={{ uri: item.download_url }} style={{ flex: 4 }} />
      ))}
    </View>
  )
}

const GridItem = props => {
  const { data } = props
  const items = [data[0], data[1], data[2]]

  return (
    <>
      {props.data.length >= 3 ? (
        <>
          <FeatGrid pics={items} sided="left" />
          <Grid data={data} />
          <FeatGrid pics={items} sided="right" />
        </>
      ) : (
        <Text>loading</Text>
      )}
    </>
  )
}

export default GridItem

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    maxHeight: 250,
    borderColor: 'red',
    borderWidth: 2,
    width: screenWidth,
    flexDirection: 'row'
  },
  thumb: {
    flex: 1,
    backgroundColor: 'lime',
    margin: 2
  },
  largeThumb: {
    flex: 4,
    margin: 2,
    backgroundColor: 'tomato'
  }
})
