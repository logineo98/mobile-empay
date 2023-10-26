import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type props = { style?: ViewStyle, children?: React.JSX.Element | React.JSX.Element[], position?: string | any, scoll?: boolean }
const Container = ({ children, position, scoll, style }: props) => {
  position = (position === "top") ? "flex-start" : (position === "center") ? "center" : (position === "bottom") ? "flex-end" : (position === "around") ? "space-around" : (position === "between") ? "space-between" : "flex-start"


  const styles = StyleSheet.create({
    scrollview: { flexGrow: 1 },
    content: { flex: 1, padding: 10, paddingTop: 0, justifyContent: position ? position : "flex-start" }
  })

  return (
    scoll ?
      (<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, style]}>
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

