import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import { colors, roboto } from '../../../libs/typography/typography'
import CustomLinearGradient from '../../../components/common/drawer/gradient/custom_linear_gradient'
import { useNavigation } from '@react-navigation/native'

const Selfie = () => {
    const navigation = useNavigation<any>()

    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#202123E3"}  >
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Faire un selfie</Text>
                        <Text style={styles.description}>Prendre une photo dans un cadre lumineux spécifique</Text>
                    </View>

                    <Spacer />

                    <View style={styles.uploadedbox}>
                        <Image source={images.passport} style={styles.uploadedImg} />
                    </View>
                    <Spacer />
                    <Spacer />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.gray }]} activeOpacity={0.9}><Text style={{ color: colors.white, fontFamily: roboto.regular, fontWeight: "bold" }}>Reprendre</Text></TouchableOpacity>
                        <CustomLinearGradient style={{ padding: 8, borderRadius: 15, flex: 1, alignItems: "center", }}><Text style={{ color: colors.black, fontFamily: roboto.regular, fontWeight: "bold" }}>Sauvegarder</Text></CustomLinearGradient>
                    </View>
                    <Spacer />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("secure")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Selfie


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    buttons: { flexDirection: "row", alignItems: "center", gap: 15, width: "90%", },
    btn: { padding: 8, backgroundColor: colors.white, flex: 1, borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { width: "80%", alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 24, color: colors.white, fontFamily: roboto.bold, textTransform: "uppercase" },
    uploadedbox: { width: "90%", height: 320, borderRadius: 90, backgroundColor: colors.gray, borderWidth: 2, borderColor: colors.white, overflow: "hidden" },
    uploadedImg: { width: "100%", height: "100%", marginBottom: 20, borderWidth: 0, resizeMode: "cover" },
    description: { fontSize: 13, textAlign: "center", color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})