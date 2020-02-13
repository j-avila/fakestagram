import React from 'react'
import { Text, StyleSheet, View, Button, Image, Dimensions } from 'react-native'

export default PostItem = props => {
  const { data, profileRoute, commentsRoute } = props
  const { width } = Dimensions.get('window')
  console.log('postauth', props.author)
  return (
    <View style={styles.item}>
      <View style={styles.title}>
        <Text key={data.post.description}>{data.post.description}</Text>
      </View>
      <View style={styles.container}>
        <Image
          source={{ uri: data.image }}
          resizeMode="cover"
          style={{ width: width, height: width }}
        />
      </View>
      <Button title="go to profile" onPress={profileRoute} />
      <Button title="view Comments" onPress={commentsRoute} />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    marginVertical: 8
  },
  container: {
    flex: 1,
    alignItems: 'stretch'
    // justifyContent: 'center',
    // backgroundColor: '#F5FCFF'
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 12
  }
})
