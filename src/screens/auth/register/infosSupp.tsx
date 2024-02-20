import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

const InfosSupp = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const initial: userModel = { residenceCountry: "", nationality: "", placeOfBirth: "", city: "", nameOnCard: "", currentActivity: "", fieldOfActivity: "" }
    const [inputs, setInputs] = useState(initial);
    const [store, setStore] = useState<userModel>();

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("document"); setNext(false); } }, [next, store]);

    //----- hydrate forms
    useEffect(() => {
        AsyncStorage.getItem("inputs").then((response) => {
            if (response !== null) {
                const item = JSON.parse(response)
                setStore({ ...item })

                setInputs({
                    residenceCountry: item?.residenceCountry,
                    city: item?.city,
                    nationality: item?.nationality,
                    placeOfBirth: item?.placeOfBirth,
                    nameOnCard: item?.nameOnCard,
                    currentActivity: item?.currentActivity,
                    fieldOfActivity: item?.fieldOfActivity,
                })
            }
        })
    }, []);

    //traitement of login
    const handle_register_info = () => {

        if (inscription_inputs_request("infos2", inputs, setError)) return;

        setStore({ ...store, ...inputs })
        setNext(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_bg_img}  >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", }}>
                <>
                    <Spacer />
                    <View><Image source={images.logo_white} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Inscription</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <View style={styles.input_wrapper}>
                            {inputs?.residenceCountry && <SmallLabel text='Pays de résidence' left={18} />}
                            <TextInput value={inputs.residenceCountry} onChangeText={(text) => handleChangeMobile("residenceCountry", text, setInputs)} placeholder={"Pays de résidence"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.city && <SmallLabel text='Ville' left={18} />}
                            <TextInput value={inputs.city} onChangeText={(text) => handleChangeMobile("city", text, setInputs)} placeholder={"Ville"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.nationality && <SmallLabel text='Nationalité' left={18} />}
                            <TextInput value={inputs.nationality} onChangeText={(text) => handleChangeMobile("nationality", text, setInputs)} placeholder={"Nationalité"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.placeOfBirth && <SmallLabel text='Lieu de naissance' left={18} />}
                            <TextInput value={inputs.placeOfBirth} onChangeText={(text) => handleChangeMobile("placeOfBirth", text, setInputs)} placeholder={"Lieu de naissance"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.nameOnCard && <SmallLabel text='Nom exact que vous voulez voir apparaître sur la carte' left={18} />}
                            <TextInput value={inputs.nameOnCard} onChangeText={(text) => handleChangeMobile("nameOnCard", text, setInputs)} placeholder={"Nom exact que vous voulez voir apparaître sur la carte"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.currentActivity && <SmallLabel text='Emploi/ occupation actuelle' left={18} />}
                            <TextInput value={inputs.currentActivity} onChangeText={(text) => handleChangeMobile("currentActivity", text, setInputs)} placeholder={"Emploi/ occupation actuelle"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.fieldOfActivity && <SmallLabel text='Domaine d’activité de l’employeur' left={18} />}
                            <TextInput value={inputs.fieldOfActivity} onChangeText={(text) => handleChangeMobile("fieldOfActivity", text, setInputs)} placeholder={"Domaine d’activité de l’employeur"} placeholderTextColor={colors.gray} style={styles.input} />
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

export default InfosSupp

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