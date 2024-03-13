import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import { colors, roboto } from '../../../libs/typography/typography'
import CustomLinearGradient from '../../../components/common/drawer/gradient/custom_linear_gradient'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { userModel } from '../../../libs/services/user/user.model'
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import fs from 'react-native-fs';
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import ToastContainer from '../../../components/common/toast'
import NoPermissionCard from '../../../components/card/drawer/no_permission_card'
import DeviceInfo from 'react-native-device-info'


const Selfie = () => {
    const cameraRef = useRef<any>(null);
    const navigation = useNavigation<any>()
    let scale = useSharedValue(1);
    const [inputs, setInputs] = useState<userModel>({ profil: "" });
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const [granted, setGranted] = useState(false)
    const device = useCameraDevice("front");
    const isFocused = useIsFocused()

    const [imageSource, setImageSource] = useState('');

    console.log(DeviceInfo.getBrand())

    //----- get camera permission useeffect
    useEffect(() => { getCameraPermission() }, [device]);

    //----- display errors
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error]);

    //----- animation
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //----- go next screen if alright
    useEffect(() => { setLocalStorage() }, [next]);

    //----- get local storage data and hydrate form
    useEffect(() => { getLocalStorage() }, []);


    //----- get camera permission
    async function getCameraPermission() {
        if (device) device.sensorOrientation = "landscape-left";
        const cameraPermission = await Camera.requestCameraPermission();
        setGranted(cameraPermission === 'granted');
    }

    //----- take a photo
    const takePhoto = async () => {

        if (cameraRef.current !== null) {
            try {
                const photo = await cameraRef.current.takePhoto({ orientation: "portrait" });
                console.log(photo)
                setImageSource('file:///' + photo.path)
                setInputs({ ...inputs, profil: { uri: 'file:///' + photo.path, type: 'image/jpeg', name: "profile" + '-image.jpg' } })


            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    //----- remove photo
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

    //----- set local storage data and go next
    async function setLocalStorage() {
        if (next) {
            const response = await getLocalStorage()
            const save = { ...response, ...inputs }
            AsyncStorage.setItem("inputs", JSON.stringify(save));
            navigation.navigate("signature");
            setNext(false);
        }
    }

    //----- get local storage data
    async function getLocalStorage() {
        const response = await AsyncStorage.getItem("inputs");
        return JSON.parse(response as string)
    }

    //----- selfie traitement
    const handle_validate = () => {
        if (inscription_inputs_request("selfie", inputs, setError)) return;
        //  setStore({ ...store, profil: inputs?.profil })
        setNext(true)
    }
    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    if (!device) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}><ActivityIndicator size={20} color={colors.fond1} /></View>;


    return (
        <Wrapper image imageData={images.register_selfie_bg_img} overlay={"#131722E5"}   >
            <StatusBar translucent backgroundColor={"transparent"} />
            <ToastContainer />
            {!granted ? <NoPermissionCard permission_type='à la caméra' /> :
                <Container scoll position={"between"} style={{ alignItems: "center", marginTop: 20 }}>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Spacer />

                        <View style={styles.descriptionbox}>
                            <Text style={styles.title}>Faire un selfie</Text>
                            <Text style={styles.description}>Prendre une photo dans un cadre lumineux spécifique</Text>
                        </View>

                        <Spacer />

                        <View style={styles.uploadedbox}>
                            {imageSource ?
                                <Image source={{ uri: imageSource }} style={[styles.uploadedImg, StyleSheet.absoluteFill]} />
                                :
                                <Camera
                                    orientation="landscape-left"
                                    device={device}
                                    ref={cameraRef}
                                    style={[StyleSheet.absoluteFill]}
                                    photo={true}
                                    isActive={isFocused} />
                            }
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
                </Container>}
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

    uploadedbox: { width: "80%", height: 315, borderRadius: 90, backgroundColor: colors.gray, borderWidth: 2, borderColor: colors.white, overflow: "hidden", },
    uploadedImg: { transform: [{ rotate: "90deg" }], resizeMode: "cover" },

    description: { fontSize: 13, textAlign: "center", color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})