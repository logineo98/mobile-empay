import { View } from 'react-native'
import React from 'react'

const Spacer = ({ style }: any) => {
    return (<View style={[{ height: 30 }, style,]} />)
}
export default Spacer