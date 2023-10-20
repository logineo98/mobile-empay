import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import Container from '../../../components/common/container'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../libs/services/store'
import Toast from 'react-native-toast-message'
import { useNavigation, useRoute } from '@react-navigation/native'
import ToastContainer from '../../../components/common/toast'
import { forgot_password, forgot_verify, resent_code } from '../../../libs/services/user/user.action'
import SecondaryLoading from '../../../components/common/secondary_loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Verify = () => {

    let scale = useSharedValue(1);
    const route = useRoute<any>()
    const routes = route?.params
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [inputs, setInputs] = useState({ code: "" });
    const [debugCode, setDebugCode] = useState("");
    const [value, setValue] = useState('');

    useEffect(() => { setInputs({ ...inputs, code: value }) }, [value]);


    const { user_tmp, user_info, user_data, user_loading, user_errors } = useSelector((state: RootState) => state?.user)

    console.log(user_data)

    //setup debug code
    useEffect(() => {
        AsyncStorage.getItem("code")
            .then((res: any) => {
                if (user_data) setDebugCode(user_data?.code);
                if (routes?.confirmationCode) setDebugCode(routes?.confirmationCode)
                else if (res) setDebugCode(res);
            })
    }, [routes, user_data]);


    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);





    //result of traitement
    useEffect(() => { if (user_tmp && user_data) { navigation.navigate("reset", { data: user_data }); dispatch({ type: "reset_user_tmp" }); dispatch({ type: "reset_user_data" }); setClick(false) } }, [user_tmp, user_data, dispatch]);



    //traitement of verify
    const handle_verify = () => {
        (inputs as any).id = routes?.data?.id;

        AsyncStorage.setItem("code", `${inputs.code}`)
        dispatch(forgot_verify(inputs, setError))
        setClick(true)
    }


    const handleRetry = () => {
        dispatch(resent_code({ phone: routes?.data?.phone }, setError))
        routes.code = null
        setClick(true)
    }

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#074769C5"}  >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Code de vérification</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>

                    <Spacer />

                    <View style={styles.forms}>
                        <TextInput value={inputs?.code} onChangeText={text => handleChangeMobile("phone", text, setInputs)} keyboardType="phone-pad" placeholder='Numéro de téléphone' placeholderTextColor={colors.gray} style={styles.input} />

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                            <Text style={{ color: colors.white }}>Vous n'avez pas encore reçu de code? </Text>
                            <TouchableOpacity onPress={handleRetry} activeOpacity={0.8}><Text style={{ color: colors.ika_wari_taa_bg_color }}>réessayer</Text></TouchableOpacity>
                        </View>

                        {debugCode && <View style={{ flexDirection: "row", alignItems: "center" }}><Text style={{ color: colors.white }}>Debug code</Text><Text style={{ color: colors.ika_wari_taa_bg_color }}>{debugCode}</Text></View>}
                    </View>
                    <Spacer height={10} />
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_verify} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>
            {click && user_loading && <SecondaryLoading text={"Veuillez patienter! Verification du code de recuperation en cours.."} />}
        </Wrapper>
    )
}

export default Verify

const styles = StyleSheet.create({
    logo: { width: 150, height: 150, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    input: { color: colors.black, padding: 5, paddingLeft: 15, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})