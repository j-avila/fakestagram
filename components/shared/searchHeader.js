import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Search from '../../assets/search.svg'
import { Ionicons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const SearchHeader = props => {
  const { searchOn, navigation } = props
  // console.log('nav options', navigation)
  return (
    <>
      {searchOn ? (
        <View style={styles.head}>
          <TextInput style={styles.input} />
          <Search fill="red" style={styles.icon} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchIndex')}
          style={styles.head}
        >
          <Search fill="red" style={styles.icon} />
          <Text style={styles.input}>Buscar</Text>
        </TouchableOpacity>
      )}
    </>
  )
}

export default SearchHeader

const styles = StyleSheet.create({
  head: {
    flex: 1,
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  icon: {
    flex: 2,
    padding: 8
  },
  input: {
    flex: 1,
    color: 'grey',
    paddingHorizontal: 12
  }
})
