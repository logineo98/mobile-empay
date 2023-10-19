import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import Container from '../../../components/common/container'
import { images } from '../../../libs/constants/constants'

const Login = () => {


    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#074769C5"}  >
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Connexion</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <TextInput placeholder='Numéro de téléphone' placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput placeholder={"🔒 Mot de passe"} placeholderTextColor={colors.gray} style={styles.input} />
                    </View>
                    <Spacer height={10} />
                    <View style={styles.registerBtn}><Text style={{ color: colors.white, fontFamily: roboto.regular, fontSize: 15 }}>S'inscrire</Text></View>
                    <Spacer height={25} />
                    <View style={{ alignItems: "center" }}><Text style={{ textAlign: "center", color: colors.ika_wari_taa_bg_color, textDecorationLine: "underline" }}>Mot de passe oublié ?</Text></View>
                    <Spacer />
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    logo: { width: 150, height: 150, tintColor: colors.white },
    forms: { gap: 15, width: "100%", alignItems: "center" },
    input: { padding: 5, backgroundColor: colors.white, width: "80%", borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})