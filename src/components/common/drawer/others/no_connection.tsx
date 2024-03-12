import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'

const NoConnection = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.info, { fontSize: 20, fontFamily: roboto.bold, }]}>Aucune connexion Internet</Text>
            <Text style={styles.info}>Veuillez activer votre connexion</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },

    info: { fontSize: 14, fontFamily: roboto.regular, textAlign: 'center', },

    actualisation: { marginVertical: 40, padding: 10, backgroundColor: `rgba(155,155,155,0.1)` },
})

export default NoConnection
