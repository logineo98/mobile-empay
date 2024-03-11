import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { userModel } from '../../../libs/services/user/user.model'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import ToastContainer from '../../../components/common/toast'
import SmallLabel from '../../../components/common/small_label'

const EmergencyContact = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const initial = { contactName: "", contactFirstname: "", contactAddress: "", contactPhone: "", contactEmail: "", contactRelationship: "" }
    const [inputs, setInputs] = useState(initial);


    //----- display errors
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //----- animation
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //----- go next screen if alright
    useEffect(() => { setLocalStorage() }, [next]);

    //----- get local storage data and hydrate form
    useEffect(() => { getLocalStorage() }, []);

    //----- set local storage data and go next
    async function setLocalStorage() {
        if (next) {
            const response = await getLocalStorage()
            const save = { ...response, ...inputs }
            AsyncStorage.setItem("inputs", JSON.stringify(save));
            navigation.navigate("secure");
            setNext(false);
        }
    }

    //----- get local storage data
    async function getLocalStorage() {
        const response = await AsyncStorage.getItem("inputs");
        if (response !== null) {
            const item = JSON.parse(response)

            setInputs({
                contactName: item?.contactName,
                contactFirstname: item?.contactFirstname,
                contactAddress: item?.contactAddress,
                contactPhone: item?.contactPhone,
                contactEmail: item?.contactEmail,
                contactRelationship: item?.contactRelationship
            })
        }
        return JSON.parse(response as string)
    }

    //----- emergency contact traitement
    const handle_register_info = () => {
        if (inscription_inputs_request("emergency", inputs, setError)) return;

        setNext(true)
    }



    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_bg_img}  >
            <StatusBar translucent backgroundColor={"transparent"} />

            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", marginTop: 20 }}>
                <>
                    <Spacer />
                    <View><Image source={images.logo_white} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.title}>Contact de personne</Text>
                            <Text style={styles.title}> à prévenir</Text>
                        </View>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactName && <SmallLabel text='Nom du contact' left={18} />}
                            <TextInput value={inputs.contactName} onChangeText={(text) => handleChangeMobile("contactName", text, setInputs)} placeholder={"Nom du contact"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactFirstname && <SmallLabel text='Prénom du contact' left={18} />}
                            <TextInput value={inputs.contactFirstname} onChangeText={(text) => handleChangeMobile("contactFirstname", text, setInputs)} placeholder={"Prénom du contact"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactAddress && <SmallLabel text="L'adresse du contact" left={18} />}
                            <TextInput value={inputs.contactAddress} onChangeText={(text) => handleChangeMobile("contactAddress", text, setInputs)} placeholder={"L'adresse du contact"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactPhone && <SmallLabel text='Téléphone portable du contact' left={18} />}
                            <TextInput value={inputs.contactPhone} onChangeText={(text) => handleChangeMobile("contactPhone", text, setInputs)} placeholder={"Téléphone portable du contact"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactEmail && <SmallLabel text='Adresse email du contact' left={18} />}
                            <TextInput value={inputs.contactEmail} onChangeText={(text) => handleChangeMobile("contactEmail", text, setInputs)} placeholder={"Adresse email du contact"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.contactRelationship && <SmallLabel text='Nature de la relation' left={18} />}
                            <TextInput value={inputs.contactRelationship} onChangeText={(text) => handleChangeMobile("contactRelationship", text, setInputs)} placeholder={"Nature de la relation"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                    </View>
                    <Spacer />
                </>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_register_info} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>
        </Wrapper >
    )
}

export default EmergencyContact

const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    // input: { paddingLeft: 15, color: colors.black, padding: 5, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    button: { width: "100%", padding: 15, backgroundColor: colors.fond1, justifyContent: "center", alignItems: "center", marginVertical: 10 },
    modal: { alignItems: "center", justifyContent: "center", backgroundColor: ' rgba(0,0,0,0.1)', height: "100%", },
    input_wrapper: { backgroundColor: colors.white, width: "100%", borderRadius: 15, overflow: "hidden", position: "relative" },
    input: { paddingLeft: 15, color: colors.black, backgroundColor: colors.white, width: "100%", alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
})