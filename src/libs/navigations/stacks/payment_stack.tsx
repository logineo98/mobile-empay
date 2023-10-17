import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// my importations
import Facture from '../../../screens/drawer/facture'
import PaymentCanalPlus from '../../../screens/drawer/payment/payment_canal_plus'
import PaymentEdm from '../../../screens/drawer/payment/payment_edm'
import PaymentIsago from '../../../screens/drawer/payment/payment_isago'
import PaymentMalivision from '../../../screens/drawer/payment/payment_malivision'
import PaymentSomagep from '../../../screens/drawer/payment/payment_somagep'
import PaymentStarTimes from '../../../screens/drawer/payment/payment_startimes'

const PaymentStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator initialRouteName='facture' screenOptions={{ headerShown: false, }} >
            <stack.Screen name='facture' component={Facture} />
            <stack.Screen name='payment_canal_plus' component={PaymentCanalPlus} />
            <stack.Screen name='payment_edm' component={PaymentEdm} />
            <stack.Screen name='payment_isago' component={PaymentIsago} />
            <stack.Screen name='payment_malivision' component={PaymentMalivision} />
            <stack.Screen name='payment_somagep' component={PaymentSomagep} />
            <stack.Screen name='payment_startimes' component={PaymentStarTimes} />
        </stack.Navigator>
    )
}

export default PaymentStack

const styles = StyleSheet.create({})