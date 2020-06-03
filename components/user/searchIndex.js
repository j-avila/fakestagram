import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Avatar from '../shared/avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PorfileItem = props => {
  return (
    <View style={styles.profile}>
      <Avatar />
      <Text>user</Text>
    </View>
  )
}

const SearchIndex = () => {
  return (
    <View style={{ felx: 1, justifyContent: 'space-between' }}>
      <Text> heres goes search</Text>
      <View style={styles.container}>
        <PorfileItem />
        <PorfileItem />
      </View>
    </View>
  )
}

export default SearchIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
