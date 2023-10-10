import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type props = { children?: React.JSX.Element | React.JSX.Element[], position?: string | any, scoll?: boolean }
const Container = ({ children, position, scoll }: props) => {
  position = (position === "top") ? "flex-start" : (position === "center") ? "center" : (position === "bottom") ? "flex-end" : "flex-start"


  const styles = StyleSheet.create({
    scrollview: { flexGrow: 1, },
    content: { flex: 1, padding: 10, paddingTop: 0, justifyContent: position ? position : "flex-start" }
  })

  return (
    scoll ?
      (<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollview}>
        <View style={styles.content}>
          {children}
        </View>
      </ScrollView>)
      :
      (<View style={styles.scrollview}>
        <View style={styles.content}>{children}</View>
      </View>)
  )
}

export default Container

