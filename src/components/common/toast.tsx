import { View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const ToastContainer = () => {
    return (
        <View style={{ zIndex: 200 }}><Toast /></View>
    )
}

export default ToastContainer
