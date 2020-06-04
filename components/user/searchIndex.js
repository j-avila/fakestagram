import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Avatar from '../shared/avatar'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

const PorfileItem = props => {
  return (
    <TouchableOpacity style={styles.profile}>
      <Avatar />
      <Text>user</Text>
    </TouchableOpacity>
  )
}

const dumb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const SearchIndex = () => {
  const [loading, setLoading] = useState(false)

  const fetchUsers = load => {
    setTimeout(() => {
      setLoading(!load)
    }, 10000)
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Resultados</Text>
      <View style={styles.container}>
        {dumb.length >= 1 ? (
          <FlatList
            data={dumb}
            refreshing={loading}
            renderItem={() => <PorfileItem />}
            onRefresh={() => fetchUsers(loading)}
          />
        ) : (
          <Text>nothing to show</Text>
        )}
      </View>
    </ScrollView>
  )
}

export default SearchIndex

const styles = StyleSheet.create({
  title: {
    color: 'grey',
    fontSize: 13,
    padding: 10
  },
  container: {},
  profile: {
    flex: 1,
    paddingVertical: 14,
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
