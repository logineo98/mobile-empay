import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { colors, roboto } from '../../../libs/typography/typography'
import Wrapper from '../../../components/common/wrapper'
import Container from '../../../components/common/container'
import Spacer from '../../../components/common/spacer'
import { images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import { useDispatch, } from 'react-redux';
import { userModel } from '../../../libs/services/user/user.model';
import SignatureCapture from 'react-native-signature-capture'
import Toast from 'react-native-toast-message';
import { Image as CompressImg } from 'react-native-compressor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { inscription_inputs_request } from '../../../libs/services/user/user.request';
import ToastContainer from '../../../components/common/toast';

const Signature = () => {
    const navigation = useNavigation<any>()
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const initial: userModel = { signature: null }
    const [inputs, setInputs] = useState(initial);
    const [store, setStore] = useState<userModel>();
    const signatureRef = useRef<any>();
    const [sign, setSign] = useState<any>('');
    const [ok, setOk] = useState(false);
    const [isChecked, setIsChecked] = useState(false);



    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //animate login button
    useEffect(() => { if (inputs?.signature !== null && isChecked) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [inputs?.signature, isChecked]);

    //setup signature
    useEffect(() => {
        if (sign === "") setInputs({ ...inputs, signature: "" })
        compressingFn()
    }, [sign, ok]);


    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("emergency_contact"); setNext(false); } }, [next, store]);

    //----- hydrate forms
    useEffect(() => {
        AsyncStorage.getItem("inputs").then((response) => {
            if (response !== null) {
                const item = JSON.parse(response)
                setStore({ ...item })
            }
        })
    }, []);


    const resetSign = () => { signatureRef.current.resetImage(); setInputs({ ...inputs, signature: null }) };
    const _onSaveEvent = (result: any) => { setSign(result?.pathName); setOk(!ok) };
    const _onDragEvent = () => { signatureRef.current.saveImage() };

    const compressingFn = async () => {
        try {
            const img = await CompressImg.compress(`file:///${sign}`, { output: "png", compressionMethod: "auto", quality: 0.5, })
            setInputs({ ...inputs, signature: { uri: img, type: 'image/png', name: 'signature.png' } })
        } catch (error: any) {
            console.log("Erreur lors de la signature")
        }
    }

    //traitement of login
    const handle_validate = () => {
        const validation: userModel = { signature: inputs?.signature, isChecked: isChecked }
        if (inscription_inputs_request("signature", validation, setError)) return;
        setStore({ ...store, signature: inputs?.signature })

        setNext(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_signature_bg_img}   >
            <StatusBar backgroundColor={"#2E427D"} barStyle={"light-content"} />
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", }}>
                <View />

                <View style={{ width: "100%", alignItems: "center" }}>
                    <Spacer />
                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Condition générales et signature:</Text>
                    </View>

                    <Spacer />

                    <View style={styles.signatureZone}>
                        <SignatureCapture
                            style={[{ width: "100%", height: "100%" }]}
                            ref={signatureRef}
                            onSaveEvent={_onSaveEvent}
                            onDragEvent={_onDragEvent}
                            saveImageFileInExtStorage={true}
                            showNativeButtons={false}
                            showTitleLabel={false}
                            viewMode={"portrait"} />
                        <TouchableOpacity onPress={resetSign} activeOpacity={0.8} style={styles.close} ><FontAwesome name="close" size={24} color={"blue"} /></TouchableOpacity>
                    </View>
                    <Spacer height={15} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <CheckBox
                            disabled={false}
                            tintColors={{ true: colors.white, false: colors.white }}
                            value={isChecked}
                            onValueChange={(newValue) => setIsChecked(newValue)}
                        />
                        <Text style={{ color: colors.white, fontFamily: roboto.bold, }}>J'accepte les conditions générales*</Text>
                    </View>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
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
    signatureZone: { height: 150, width: "90%", backgroundColor: colors.white, borderRadius: 15, overflow: "hidden" },
    close: { left: 5, top: 5, borderRadius: 5, position: "absolute", height: 25, width: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "blue" },
})