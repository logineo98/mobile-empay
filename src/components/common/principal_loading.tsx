import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from "react-native"

type props = { text?: string }
const PrincipalLoader = ({ text }: props) => {
    const { width, height } = useWindowDimensions()

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "white", alignContent: "center", justifyContent: "center", width: width },
        txtbox: { alignItems: 'center', justifyContent: 'center', },
        text: { fontSize: 12, color: "black" },
    })

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={"black"} />
            <View style={styles.txtbox}>
                <Text style={styles.text}>{text || "Veuillez patienter pendant le chargement des données."}</Text>
                <Text style={styles.text}>Merci</Text>
            </View>
        </View>
    )
}

export default PrincipalLoader

