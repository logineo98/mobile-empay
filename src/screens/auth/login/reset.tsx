import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../../components/common/wrapper'
import ToastContainer from '../../../components/common/toast'
import Container from '../../../components/common/container'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { colors, roboto } from '../../../libs/typography/typography'
import { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { RootState } from '../../../libs/services/store'
import { checking, reset_password } from '../../../libs/services/user/user.action'
import SecondaryLoading from '../../../components/common/secondary_loading'

const Reset = () => {
    let scale = useSharedValue(1);
    const route = useRoute<any>()
    const routes = route?.params
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [inputs, setInputs] = useState({ password: "", confirm: "" });

    const { user_tmp, user_info, user_loading, user_errors } = useSelector((state: RootState) => state?.user)


    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (user_tmp) dispatch(checking()); dispatch({ type: "reset_user_tmp" }); setClick(false) }, [user_tmp, dispatch]);


    //traitement of login
    const handle_reset = () => {
        (inputs as any).id = routes?.data?.id;
        dispatch(reset_password(inputs, setError))
        setClick(true)
    }

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#074769C5"}  >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Réinitialiser mot de passe:</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>

                    <Spacer />

                    <View style={styles.forms}>
                        <TextInput value={inputs.password} onChangeText={text => handleChangeMobile("password", text, setInputs)} placeholder={"MoTDePasse10234"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput value={inputs.confirm} onChangeText={text => handleChangeMobile("confirm", text, setInputs)} placeholder={"****************"} placeholderTextColor={colors.gray} style={styles.input} />
                    </View>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_reset} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
                {/* <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity> */}
            </Container>
            {click && user_loading && <SecondaryLoading text={"Veuillez patienter! Réinitialisation du mot de passe en cours.."} />}
        </Wrapper>
    )
}

export default Reset


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
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