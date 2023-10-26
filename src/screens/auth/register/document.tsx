import { Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Modal from "react-native-modal";
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import { useNavigation } from '@react-navigation/native'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image as CompressImg } from 'react-native-compressor';
import ImageCropPicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'
import { userModel } from '../../../libs/services/user/user.model'
import { RootState } from '../../../libs/services/store'
import Toast from 'react-native-toast-message'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToastContainer from '../../../components/common/toast';


const Document = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()

    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const initial: userModel = { document: "" }
    const [inputs, setInputs] = useState(initial);
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState<any>();
    const [store, setStore] = useState<userModel>();



    const { user_info, user_loading, user_errors } = useSelector((state: RootState) => state?.user)


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
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("selfie"); setNext(false); setClick(false) } }, [next, store]);

    const openModal = () => { setVisible(!visible) }


    const selectImage = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    ImageCropPicker.openPicker({ cropping: true, cropperCircleOverlay: false, mediaType: 'photo', includeBase64: false, })
                        .then((response: any) => {
                            if (!response.cancelled) {
                                setImg(response?.path)
                                CompressImg.compress(response?.path, { compressionMethod: 'auto', quality: 0.2 })
                                    .then((image: any) => {

                                        const imgs = image?.split('/')
                                        const filename = imgs[imgs?.length - 1].split('.')[0]
                                        setInputs({ ...inputs, document: { uri: image, type: 'image/jpeg', name: filename + '-image.jpg' } });
                                    }).catch((err: any) => { console.log(err) });
                            }
                        })
                        .catch((error) => { setError(error) });
                }
            }).catch((err: any) => { setError(err) })

        setVisible(false)
    };

    const takePhoto = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const image = await ImageCropPicker.openCamera({ width: 300, height: 400, cropping: true, includeBase64: false })

                setImg(image?.path)
                const img = await CompressImg.compress(image?.path, { compressionMethod: 'auto', quality: 0.2 })
                const imgs = image?.path?.split('/')
                const filename = imgs[imgs?.length - 1].split('.')[0]

                setInputs({ ...inputs, document: { uri: img, type: 'image/jpeg', name: filename + '-image.jpg' } });
            } else {
                setError('Permission refusée pour accéder à la caméra');
            }
        } catch (error: any) {
            setError(error);
        }
        setVisible(false)
    };


    //traitement of login
    const handle_validate = () => {
        const validate: any = { document: inputs.document }

        if (inscription_inputs_request("document", validate, setError)) return;
        setStore({ ...store, ...inputs })

        setNext(true)
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
                        <Text style={styles.title}>Inscription - Choix du document</Text>
                    </View>

                    <Spacer />

                    {img &&
                        <View style={styles.uploadedbox}>
                            <Image source={{ uri: img }} style={styles.uploadedImg} />
                        </View>
                    }

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => openModal()} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Nina</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal()} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Passport</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal()} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>CIN</Text></TouchableOpacity>

                    </View>
                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>

            <Modal isVisible={visible} animationIn={"slideInUp"} animationOut={"bounceOut"} animationInTiming={500} animationOutTiming={1500} onBackdropPress={() => setVisible(false)}>
                <View style={{ backgroundColor: colors.white, width: '100%', height: height * 0.25, borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 10 }}>
                        <Text style={{ color: colors.black, fontSize: 20, fontFamily: roboto.bold }}>Options</Text>
                        <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={0.8}><FontAwesome name="close" style={{ color: colors.black, fontSize: 20, marginRight: 10 }} /></TouchableOpacity>
                    </View>

                    <View style={{ gap: 5, flex: 1, alignContent: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Prendre une photo</Text></TouchableOpacity>
                        <TouchableOpacity onPress={selectImage} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Choisir une photo</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Wrapper>
    )
}

export default Document


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    buttons: { gap: 15, width: "90%", alignItems: "center" },
    btn: { padding: 8, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 14, color: colors.white, fontFamily: roboto.bold },
    uploadedbox: { width: "90%", },
    uploadedImg: { width: "100%", height: 120, marginBottom: 20, borderRadius: 15, resizeMode: "cover" },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" }
})