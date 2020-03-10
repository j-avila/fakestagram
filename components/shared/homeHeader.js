import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeHeader = () => {
  return (
    <View style={styles.head}>
      <View style={styles.logoHolder}>
        <TouchableOpacity>
          <Image
            style={styles.camIcon}
            source={require('../../assets/camera.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/letter-logo.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          style={styles.searchIcon}
          source={require('../../assets/search.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoHolder: {
    flex: 1,
    flexDirection: 'row'
  },
  camIcon: {
    padding: 10,
    marginHorizontal: 10
  },
  searchIcon: {
    padding: 10,
    marginHorizontal: 10
  }
})
