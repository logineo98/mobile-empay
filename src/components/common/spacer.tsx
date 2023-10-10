import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Spacer = ({ h }: { h?: number }) => {
    return (
        <View style={{ height: h || 40 }} />

    )
}

export default Spacer

const styles = StyleSheet.create({})