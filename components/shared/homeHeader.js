import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Camera from '../../assets/camera.svg'
import LetterLogo from '../../assets/letterLogo.svg'
import Search from '../../assets/search.svg'

const HomeHeader = props => {
  // console.log('header', props)
  const { navigation } = props
  return (
    <View style={styles.head}>
      <View style={styles.logoHolder}>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <Camera style={styles.camIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LetterLogo width="140" height="60" viewBox="0 0 271 48" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Search style={styles.searchIcon} />
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
    alignItems: 'center',
    alignContent: 'center'
  },
  logoHolder: {
    flex: 1,
    flexDirection: 'row'
  },
  camIcon: {
    padding: 10,
    margin: 15
  },
  letter: {
    // marginVertical: 15
  },
  searchIcon: {
    padding: 10,
    marginHorizontal: 15
  }
})
