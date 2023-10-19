import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import { useNavigation } from '@react-navigation/native'

const Document = () => {
    const navigation = useNavigation<any>()

    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#074769C5"}  >
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Inscription - Choix du document</Text>
                    </View>

                    <Spacer />

                    <View style={styles.uploadedbox}>
                        <Image source={images.passport} style={styles.uploadedImg} />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Nina</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Passport</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>CIN</Text></TouchableOpacity>

                    </View>
                    <Spacer />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("selfie")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Document


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    buttons: { gap: 15, width: "90%", alignItems: "center" },
    btn: { padding: 8, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 14, color: colors.white, fontFamily: roboto.bold },
    uploadedbox: { width: "90%", },
    uploadedImg: { width: "100%", height: 120, marginBottom: 20, borderRadius: 15, resizeMode: "cover" },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})