import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import { colors, roboto } from '../../../libs/typography/typography'
import CustomLinearGradient from '../../../components/common/drawer/gradient/custom_linear_gradient'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { userModel } from '../../../libs/services/user/user.model'
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import fs from 'react-native-fs';
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'

const Selfie = () => {
    const cameraRef = useRef<any>(null);
    const navigation = useNavigation<any>()
    let scale = useSharedValue(1);
    const [inputs, setInputs] = useState<userModel>({ profil: "" });
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const [store, setStore] = useState<userModel>();
    const device = useCameraDevice("front")

    const [imageSource, setImageSource] = useState('');

    //get camera permission
    useEffect(() => {
        async function getPermission() { try { await Camera.requestCameraPermission(); } catch (error) { console.log(error) } }
        getPermission()
    }, []);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error]);

    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //retrieve prev datas from localstorage
    useEffect(() => { AsyncStorage.getItem("inputs").then((res: any) => { const _inpt = JSON.parse(res); setStore({ ..._inpt }) }) }, []);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("signature"); setNext(false); setClick(false) } }, [next, store]);


    const takePhoto = async () => {
        if (cameraRef.current !== null) {
            try {
                const photo = await cameraRef.current.takePhoto({})
                setImageSource('file:///' + photo.path)
                setInputs({ ...inputs, profil: { uri: 'file:///' + photo.path, type: 'image/jpeg', name: "profile" + '-image.jpg' } })

            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    const removePhoto = async () => {
        try {
            const path = imageSource;
            const exist: any = fs.exists(path)

            if (exist) {
                await fs.unlink(path);
                setImageSource('')
                setInputs({ ...inputs, profil: null })
            }
        } catch (error) {
            console.log('Erreur de suppression d\'image:', error);
        }
    }


    //traitement of login
    const handle_validate = () => {
        if (inscription_inputs_request("selfie", inputs, setError)) return;
        setStore({ ...store, profil: inputs?.profil })

        setNext(true)
        setClick(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    if (!device) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}><ActivityIndicator size={20} color={colors.fond1} /></View>;


    return (
        <Wrapper image imageData={images.auth_bg} overlay={"#202123E3"}  >
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Faire un selfie</Text>
                        <Text style={styles.description}>Prendre une photo dans un cadre lumineux spécifique</Text>
                    </View>

                    <Spacer />

                    <View style={styles.uploadedbox}>
                        {imageSource ?
                            <Image source={{ uri: imageSource }} style={styles.uploadedImg} /> :
                            <Camera device={device} ref={cameraRef} style={[styles.uploadedImg, StyleSheet.absoluteFill]} photo={true} isActive />}
                    </View>
                    <Spacer />
                    <Spacer />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={removePhoto} style={[styles.btn, { backgroundColor: colors.gray, flex: 1 }]} activeOpacity={0.9}><Text style={{ color: colors.white, fontFamily: roboto.regular, fontWeight: "bold" }}>Reprendre</Text></TouchableOpacity>
                        <TouchableOpacity onPress={takePhoto} style={{ flex: 1 }}><CustomLinearGradient style={{ padding: 8, borderRadius: 15, alignItems: "center", }}><Text style={{ color: colors.black, fontFamily: roboto.regular, fontWeight: "bold" }}>Sauvegarder</Text></CustomLinearGradient></TouchableOpacity>
                    </View>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
                {/* <TouchableOpacity onPress={() => navigation.navigate("secure")} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity> */}
            </Container>
        </Wrapper>
    )
}

export default Selfie


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    buttons: { flexDirection: "row", alignItems: "center", gap: 15, width: "90%", },
    btn: { padding: 8, backgroundColor: colors.white, flex: 1, borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { width: "80%", alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 24, color: colors.white, fontFamily: roboto.bold, textTransform: "uppercase" },
    uploadedbox: { width: "90%", height: 320, borderRadius: 90, backgroundColor: colors.gray, borderWidth: 2, borderColor: colors.white, overflow: "hidden" },
    uploadedImg: { width: "100%", height: "100%", marginBottom: 20, resizeMode: "cover" },
    uploadedImg2: { width: "100%", height: "100%", marginBottom: 20, resizeMode: "contain" },
    description: { fontSize: 13, textAlign: "center", color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})