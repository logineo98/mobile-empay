import { ActivityIndicator, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto } from '../../libs/typography/typography'

const SecondaryLoading: FC<any> = ({ children, text, textColor, op, zIndex, h }) => {
    const { width, height } = useWindowDimensions()
    h = h ? h : height

    return (
        <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", zIndex: zIndex || 10, width, height: h, backgroundColor: `rgba(0,0,0,${op || 0.9})`, }}>
            <StatusBar translucent backgroundColor={"transparent"} />
            <ActivityIndicator size="large" color={textColor || colors.white} style={{ zIndex: 10 }} />
            {text && <Text style={{ color: textColor || colors.white, fontFamily: roboto.regular, }}>{text}</Text>}
            {children}
        </View>
    )
}

export default SecondaryLoading

const styles = StyleSheet.create({})

