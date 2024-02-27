import { View, Text, DimensionValue, ColorValue } from 'react-native'
import React from 'react'

export default function SmallLabel({ top, left, right, bottom, text, color = "black", size = 7 }: { text: string, size?: number, top?: DimensionValue, left?: DimensionValue, right?: DimensionValue, bottom?: DimensionValue, color?: ColorValue }) {
    return (
        <View style={{ position: "absolute", top, left, right, bottom, zIndex: 20 }}>
            <Text style={{ fontSize: size, color: color }}>{text}</Text>
        </View>
    )
}