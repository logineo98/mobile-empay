import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'

const Infos = () => {
    const navigation = useNavigation<any>()

    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#991352C4"}  >
            <Container scoll position={"between"} style={{ alignItems: "center", }}>
                <>
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Inscription</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <View style={{ flexDirection: "row", gap: 5, }}>
                            <TextInput placeholder='+223' placeholderTextColor={colors.gray} style={[styles.input, { width: "20%" }]} />
                            <TextInput placeholder='Numéro de téléphone' placeholderTextColor={colors.gray} style={[styles.input, { flex: 1 }]} />
                        </View>
                        <TextInput placeholder={"Nom"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput placeholder={"Prénom"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput placeholder={"Date de naissance"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput placeholder={"Adresse"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput placeholder={"Email"} placeholderTextColor={colors.gray} style={styles.input} />
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <TextInput placeholder={"Avez-vous un compte UBA ?"} placeholderTextColor={colors.gray} style={[styles.input, { flex: 1 }]} />
                            <TouchableOpacity style={{ padding: 8, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: colors.gray }}>Oui</Text></TouchableOpacity>
                            <TouchableOpacity style={{ padding: 8, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: colors.gray }}>Non</Text></TouchableOpacity>
                        </View>
                        <TextInput placeholder={"Numéro de compte UBA"} placeholderTextColor={colors.gray} style={styles.input} />
                    </View>
                    <Spacer />
                </>

                <TouchableOpacity onPress={() => navigation.navigate("document")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Infos

const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    input: { padding: 5, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})