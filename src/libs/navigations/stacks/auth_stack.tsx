import { StyleSheet, } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../../screens/auth/login/login'
import Welcome from '../../../screens/auth/welcome'
import Forgot from '../../../screens/auth/login/forgot'
import Verify from '../../../screens/auth/login/verify'
import Reset from '../../../screens/auth/login/reset'
import Secure from '../../../screens/auth/register/secure'
import Document from '../../../screens/auth/register/document'
import Infos from '../../../screens/auth/register/infos'
import Selfie from '../../../screens/auth/register/selfie'
import Finalisation from '../../../screens/auth/register/finalisation'
import Signature from '../../../screens/auth/register/signature'
import InfosSupp from '../../../screens/auth/register/infosSupp'
import EmergencyContact from '../../../screens/auth/register/emergency_contact'

const AuthStack = () => {
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            <stack.Screen name='welcome' component={Welcome} />
            <stack.Screen name='login' component={Login} />
            <stack.Screen name='forgot' component={Forgot} />
            <stack.Screen name='verify' component={Verify} />
            <stack.Screen name='reset' component={Reset} />
            <stack.Screen name='infos' component={Infos} />
            <stack.Screen name='infosSupp' component={InfosSupp} />
            <stack.Screen name='document' component={Document} />
            <stack.Screen name='selfie' component={Selfie} />
            <stack.Screen name='emergency_contact' component={EmergencyContact} />
            <stack.Screen name='secure' component={Secure} />
            <stack.Screen name='signature' component={Signature} />
            <stack.Screen name='finalisation' component={Finalisation} />
        </stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})