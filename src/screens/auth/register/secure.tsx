import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import Container from '../../../components/common/container'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userModel } from '../../../libs/services/user/user.model'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import { inscription_service } from '../../../libs/services/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../libs/services/store'
import ToastContainer from '../../../components/common/toast'
import SecondaryLoading from '../../../components/common/secondary_loading'

const Secure = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()
    const [modalVisible, setModalVisible] = useState(false)

    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const initial: userModel = { password: "", confirm: "" }
    const [inputs, setInputs] = useState(initial);
    const [store, setStore] = useState<userModel | any>();
    const [selectedValue, setSelectedValue] = useState(false);


    const { user_info, user_log_tmp, user_loading, user_errors } = useSelector((state: RootState) => state?.user)


    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //retrieve prev datas from localstorage
    useEffect(() => { AsyncStorage.getItem("inputs").then((res: any) => { const _inpt = JSON.parse(res); setStore({ ..._inpt }) }) }, []);

    //result of traitement
    useEffect(() => { if (next) { navigation.navigate("finalisation"); setNext(false) } }, []);

    useEffect(() => { if (user_log_tmp) { navigation.navigate("finalisation"); dispatch({ type: "reset_user_log_tmp" }); setClick(false) } }, [user_log_tmp, dispatch]);

    //traitement of login
    const handle_validate = async () => {
        try {
            const validation: userModel = { password: inputs?.password, confirm: inputs?.confirm }
            if (inscription_inputs_request("finalisation", validation, setError)) return;

            store.password = inputs.password;
            const notificationToken = await messaging().getToken()

            const blob = new FormData()
            blob.append("name", (store as any).name)
            blob.append("firstname", (store as any).firstname)
            blob.append("phone", (store as any).phone)
            blob.append("email", store.email)
            blob.append("address", store.address)
            blob.append("accountUBA", store.account)
            blob.append("photo", (store as any).profil)
            blob.append("document", (store as any).document)
            blob.append("birthday", `${(store as any).birthday}`)
            blob.append("signature", (store as any).signature)
            blob.append("password", (store as any).password)
            blob.append("notificationToken", notificationToken)

            dispatch(inscription_service(blob, notificationToken))
            setClick(true)
        } catch (error) {

        }
    }

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    // #2E427D
    return (
        <Wrapper image imageData={images.register_secure_bg_img}   >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Créer votre mot de passe:</Text>
                    </View>

                    <Spacer />



                    <View style={styles.forms}>
                        <TextInput value={inputs.password} onChangeText={text => handleChangeMobile("password", text, setInputs)} placeholder={"MoTDePasse10234"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput value={inputs.confirm} onChangeText={text => handleChangeMobile("confirm", text, setInputs)} placeholder={"****************"} placeholderTextColor={colors.gray} style={styles.input} />
                    </View>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
                {/* <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity> */}
            </Container>
            {click && user_loading && <SecondaryLoading text={"Veuillez patienter pendant la création de compte..."} />}
        </Wrapper>
    )
}

export default Secure

const styles = StyleSheet.create({
    logo: { width: 120, height: 120, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    input: { paddingLeft: 15, color: colors.black, padding: 5, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 24, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})