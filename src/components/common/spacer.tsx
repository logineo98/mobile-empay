import { View, ViewStyle } from 'react-native'
import React from 'react'

type SpacerType = { height?: number, style?: ViewStyle }
const Spacer = ({ style, height }: SpacerType) => {
    return (<View style={[{ height: height || 30 }, style,]} />)
}
export default Spacer