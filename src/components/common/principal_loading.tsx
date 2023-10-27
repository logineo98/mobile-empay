import { ActivityIndicator, ColorValue, StyleSheet, Text, TextStyle, View, ViewStyle, useWindowDimensions } from 'react-native'
import { colors } from '../../libs/typography/typography'

type props = {
    text?: string
    color?: any
}

const PrincipalLoader = ({ text, color }: props) => {
    const { width, height } = useWindowDimensions()

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', width: width },
        txtbox: { alignItems: 'center', justifyContent: 'center', },
        text: { fontSize: 12, color: color || colors.white },
    })

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={color || colors.white} />
            <View style={styles.txtbox}>
                <Text style={styles.text}>{text || 'Veuillez patienter pendant le chargement des données.'}</Text>
                <Text style={styles.text}>Merci</Text>
            </View>
        </View>
    )
}

export default PrincipalLoader

