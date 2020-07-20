import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default DefaultHeader = props => {
  const { leftArea, rightArea, title } = props
  return (
    <View style={styles.header}>
      <View>
        {leftArea && (
          <TouchableOpacity onPress={leftArea}>
            <Ionicons name="md-arrow-back" size={32} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headTitle}>
        {title && <Text style={styles.titleTxt}>{title}</Text>}
      </View>
      <View style={!rightArea && styles.emptySpace}>
        {rightArea && (
          <TouchableOpacity onPress={rightArea}>
            <Ionicons name="md-arrow-foward" size={32} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10
  },
  headTitle: {
    textAlign: 'left'
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 20
  },
  text: {
    fontWeight: 'bold'
  },
  emptySpace: {
    width: 30,
    backgroundColor: 'tomato'
  }
})
