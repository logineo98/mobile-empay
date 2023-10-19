import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Container from '../../../components/common/container'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'

const Signature = () => {
    const navigation = useNavigation<any>()
    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#2E427DE5"}  >
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Condition générales et signature:</Text>
                    </View>

                    <Spacer />

                    <View style={styles.signatureZone}>
                        <View style={styles.close} ><FontAwesome name="close" size={24} color={"blue"} /></View>
                    </View>
                    <Spacer height={15} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <CheckBox
                            disabled={false}
                            tintColors={{ true: colors.white, false: colors.white }}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={{ color: colors.white, fontFamily: roboto.bold, }}>J'accepte les conditions générales*</Text>
                    </View>
                    <Spacer />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("finalisation")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
            </Container>
        </Wrapper>
    )
}

export default Signature

const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    forms: { gap: 15, width: "100%", alignItems: "center" },
    input: { padding: 5, backgroundColor: colors.white, width: "80%", borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 18, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    signatureZone: { height: 150, width: "90%", backgroundColor: colors.white, borderRadius: 15 },
    close: { left: 5, top: 5, borderRadius: 5, position: "absolute", height: 25, width: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "blue" },
})