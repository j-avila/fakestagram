import React from 'react'
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width)

const FeatGrid = ({ pics, sided }) => {
  return (
    <View style={styles.featGrid}>
      {sided === 'left' && (
        <Image
          source={{ uri: pics[2].download_url }}
          resizeMode="cover"
          style={{ ...styles.largeThumb }}
        />
      )}
      <View style={{ flex: 2 }}>
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
          style={{ ...styles.largeThumb }}
        />
      )}
    </View>
  )
}

const Grid = props => {
  const { data } = props

  return (
    <View style={styles.grid}>
      {data.map((item, index) => {
        if (index <= 5) {
          return (
            <Image
              key={item.id}
              source={{ uri: item.download_url }}
              style={{ width: '32%', height: '50%', margin: 2 }}
            />
          )
        } else {
          return false
        }
      })}
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
    height: 250,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  featGrid: {
    flex: 1,
    height: 250,
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
