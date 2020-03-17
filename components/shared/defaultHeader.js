import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default DefaultHeader = props => (
  <View style={styles.header}>
    {props.leftArea && (
      <TouchableOpacity>
        <Ionicons name="md-arrow-back" size={32} color="black" />
      </TouchableOpacity>
    )}
    {props.title && <Text>{props.title}</Text>}
    {props.rightArea && (
      <TouchableOpacity>
        <Ionicons name="md-arrow-foward" size={32} color="black" />
      </TouchableOpacity>
    )}
  </View>
)

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
