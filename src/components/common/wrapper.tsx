import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

type props = { children?: React.JSX.Element | React.JSX.Element[] | any }
const Wrapper = ({ children }: props) => {
    const { width, height } = useWindowDimensions()



    const styles = StyleSheet.create({
        container: { flex: 1, width, height },
    })

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Wrapper

