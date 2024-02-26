import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Octicons from "react-native-vector-icons/Octicons"
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import { colors, roboto } from '../../../libs/typography/typography'
import { useNavigation } from '@react-navigation/native'

const Finalisation = () => {
    const navigation = useNavigation<any>()


    return (
        <Wrapper image imageData={images.register_finalisation_bg_img}   >
            <StatusBar translucent backgroundColor={"transparent"} />

            <Container scoll position={"between"} style={{ alignItems: "center", marginTop: 20 }}>
                <View />

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Vos informations sont en cours de vérification</Text>
                    </View>
                    <Spacer />
                    <View>
                        <Text style={styles.description}>Votre compte est encours de vérification.</Text>
                        <Text style={styles.description}>Une confirmation vous sera envoyé dans un instant.</Text>
                    </View>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Octicons name="dot-fill" size={22} color={colors.white} />
                        <Octicons name="dot-fill" size={22} color={colors.gray} />
                        <Octicons name="dot-fill" size={22} color={colors.gray} />
                        <Octicons name="dot-fill" size={22} color={colors.gray} />
                        <Octicons name="dot-fill" size={22} color={"#B4B4B4"} />
                    </View>
                    <Spacer />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("login")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Finalisation

const styles = StyleSheet.create({
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 16, color: colors.white, fontFamily: roboto.bold, },
    description: { fontSize: 13, textAlign: "center", color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})