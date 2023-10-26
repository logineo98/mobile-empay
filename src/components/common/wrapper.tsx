import { ImageBackground, ImageStyle, ScrollView, StyleSheet, Text, View, ViewStyle, useWindowDimensions } from 'react-native'
import React from 'react'

type props = { overlay?: string, style?: ViewStyle, imageStyle?: ImageStyle, children?: React.JSX.Element | React.JSX.Element[] | any, image?: boolean, imageData?: any }
const Wrapper = ({ children, style, image, imageData, imageStyle, overlay }: props) => {
    const { width, height } = useWindowDimensions()



    const styles = StyleSheet.create({
        container: { flex: 1, width, height },
        containerImg: { flex: 1, width, height, resizeMode: 'cover' },
    })

    return (
        !image ?
            <View style={[styles.container, style]}>
                {children}
            </View> :
            (<ImageBackground source={imageData} style={[styles.containerImg, imageStyle, {}]}>
                {overlay && <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: overlay }} />}
                {children}
            </ImageBackground>)

    )
}

export default Wrapper

