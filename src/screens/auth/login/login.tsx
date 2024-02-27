import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import Container from '../../../components/common/container'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { checking, login } from '../../../libs/services/user/user.action'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../libs/services/store'
import messaging from '@react-native-firebase/messaging'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import ToastContainer from '../../../components/common/toast'
import SecondaryLoading from '../../../components/common/secondary_loading'
import { getUniqueId } from 'react-native-device-info';
import SmallLabel from '../../../components/common/small_label'


const Login = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [inputs, setInputs] = useState({ phone: "", password: "" });

    const { user_tmp, host, user_info, user_loading, user_errors } = useSelector((state: RootState) => state?.user)

    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    const msg = "pas autorisés"
    useEffect(() => { if (error && error !== null && !error.includes(msg)) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (user_tmp && host) dispatch(checking()); dispatch({ type: "reset_user_tmp" }); setClick(false) }, [user_tmp, host, dispatch]);


    //traitement of login
    const handle_login = async () => {
        try {
            const notificationToken = await messaging().getToken();
            const deviceID = await getUniqueId();
            (inputs as any).notificationToken = `${deviceID}|${notificationToken}`;

            dispatch(login(inputs, setError))
            setClick(true)

        } catch (error) {
            console.log("notificationToken error")
        }
    }

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.connexion_bg_img} >
            <StatusBar translucent backgroundColor={"transparent"} />
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", marginTop: 20 }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <View><Image source={images.logo_white} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Connexion</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <View style={styles.input_wrapper}>
                            {inputs?.phone && <SmallLabel text='Phone' left={18} />}
                            <TextInput value={inputs?.phone} onChangeText={text => handleChangeMobile("phone", text, setInputs)} keyboardType="phone-pad" placeholder='Numéro de téléphone' placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.password && <SmallLabel text='Password' left={18} />}
                            <TextInput value={inputs?.password} onChangeText={text => handleChangeMobile("password", text, setInputs)} placeholder={"🔒 Mot de passe"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                    </View>
                    <Spacer height={10} />
                    <TouchableOpacity onPress={() => navigation.navigate("infos")} activeOpacity={0.8} style={styles.registerBtn}><Text style={{ padding: 7, color: colors.white, fontFamily: roboto.regular, fontSize: 15 }}>S'inscrire</Text></TouchableOpacity>
                    <Spacer height={25} />
                    <TouchableOpacity onPress={() => navigation.navigate("forgot")} activeOpacity={0.8} style={{ alignItems: "center" }}><Text style={{ textAlign: "center", color: colors.ika_wari_taa_bg_color, textDecorationLine: "underline" }}>Mot de passe oublié ?</Text></TouchableOpacity>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_login} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>
            {click && user_loading && <SecondaryLoading text={"Veuillez patienter! connexion en cours.."} h={"100%"} />}
        </Wrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    logo: { width: 150, height: 150, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    // input: { color: colors.black, padding: 5, paddingLeft: 10, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    input_wrapper: { backgroundColor: colors.white, width: "100%", borderRadius: 15, overflow: "hidden", position: "relative" },
    input: { paddingLeft: 15, color: colors.black, backgroundColor: colors.white, width: "100%", alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
})