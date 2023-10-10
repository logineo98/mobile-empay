import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import Store from './src/libs/services/store'

import 'react-native-gesture-handler'
import RootNavigation from './src/libs/navigations/root_navigation'

const App = () => {
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})