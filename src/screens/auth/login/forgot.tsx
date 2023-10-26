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
import { useNavigation } from '@react-navigation/native'
import ToastContainer from '../../../components/common/toast'
import { forgot_password } from '../../../libs/services/user/user.action'
import SecondaryLoading from '../../../components/common/secondary_loading'

const Forgot = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [inputs, setInputs] = useState({ phone: "" });

    const { user_log_tmp, user_info, user_data, user_loading, user_errors } = useSelector((state: RootState) => state?.user)


    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (user_log_tmp && user_data && !user_info) { navigation.navigate("verify", { data: user_data }); dispatch({ type: "reset_user_log_tmp" }); dispatch({ type: "reset_user_data" }); setClick(false) } }, [user_log_tmp, user_data, dispatch]);


    //traitement of forgot
    const handle_forgot = () => {
        dispatch(forgot_password(inputs, setError))
        setClick(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_secure_bg_img}   >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Mot de passe oublié</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <TextInput value={inputs?.phone} onChangeText={text => handleChangeMobile("phone", text, setInputs)} keyboardType="phone-pad" placeholder='Numéro de téléphone' placeholderTextColor={colors.gray} style={styles.input} />
                    </View>
                    <Spacer height={10} />
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_forgot} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>
            {click && user_loading && <SecondaryLoading text={"Veuillez patienter! Verification du numéro de téléphone en cours"} />}
        </Wrapper>
    )
}

export default Forgot

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