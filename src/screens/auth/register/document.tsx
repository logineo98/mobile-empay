import { Image, PermissionsAndroid, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Modal from "react-native-modal";
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import { useNavigation } from '@react-navigation/native'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image as CompressImg } from 'react-native-compressor';
import ImageCropPicker from 'react-native-image-crop-picker'
import { useDispatch } from 'react-redux'
import { userModel } from '../../../libs/services/user/user.model'
import Toast from 'react-native-toast-message'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToastContainer from '../../../components/common/toast';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import SmallLabel from '../../../components/common/small_label';


const Document = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { height } = useWindowDimensions()
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const [selectDate, setSelectDate] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
    const [expireDate, setExpireDate] = useState<Date | null>(null);
    const [typeModal, setTypeModal] = useState<"document" | "delivery" | "expire">("document");
    const initial: userModel = { document: "", documentDeliveryDate: "", documentExpirationDate: "", documentLicensingAuthority: "", documentNumber: "" }
    const [inputs, setInputs] = useState(initial);
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState<any>();
    const [store, setStore] = useState<userModel>();

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("selfie"); setNext(false); } }, [next, store]);


    //----- hydrate forms
    useEffect(() => {
        AsyncStorage.getItem("inputs").then((response) => {
            if (response !== null) {
                const item = JSON.parse(response)
                setStore({ ...item })

                setInputs({
                    documentDeliveryDate: item?.documentDeliveryDate,
                    documentExpirationDate: item?.documentExpirationDate,
                    documentLicensingAuthority: item?.documentLicensingAuthority,
                    documentNumber: item?.documentNumber
                })

                if (item?.documentDeliveryDate) setDeliveryDate(new Date(item?.documentDeliveryDate))
                if (item?.documentExpirationDate) setExpireDate(new Date(item?.documentExpirationDate))
            }
        })
    }, []);


    const openModal = (type: "document" | "delivery" | "expire") => { setVisible(!visible); setTypeModal(type) }


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
                        .catch((error) => { console.log("select pic error: ", error) });
                }
            }).catch((error: any) => { console.log("select pic error: ", error) })

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
                console.log('Permission refusée pour accéder à la caméra');
            }
        } catch (error: any) {
            console.log("take pic error: ", error)
        }
        setVisible(false)
    };



    //traitement of login
    const handle_validate = () => {

        inputs.documentDeliveryDate = deliveryDate ? `${deliveryDate}` : ""
        inputs.documentExpirationDate = expireDate ? `${expireDate}` : ""
        if (inscription_inputs_request("document", inputs, setError)) return;
        setStore({ ...store, ...inputs })

        setNext(true)
    }



    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    return (
        <Wrapper image imageData={images.register_document_bg_img}   >
            <StatusBar backgroundColor={"#2E427D"} barStyle={"light-content"} />
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <Spacer />
                    <Spacer />
                    <View><Image source={images.logo_white} style={styles.logo} /></View>

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
                        <TouchableOpacity onPress={() => openModal("document")} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Nina</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal("document")} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>Passport</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal("document")} style={styles.btn} activeOpacity={0.9}><Text style={{ color: colors.gray }}>CIN</Text></TouchableOpacity>
                    </View>
                    <Spacer height={25} />
                    <View style={styles.forms}>
                        <Text style={{ textAlign: "left", ...styles.title }}>Informations sur le document</Text>

                        <View style={styles.input_wrapper}>
                            {inputs?.documentNumber && <SmallLabel text='N° du document d’identité' left={18} />}
                            <TextInput value={inputs?.documentNumber} onChangeText={(text) => handleChangeMobile("documentNumber", text, setInputs)} placeholder={"N° du document d’identité"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>


                        <TouchableWithoutFeedback onPress={() => { openModal("delivery"); setDeliveryDate(new Date()) }}>
                            <View style={[styles.input_wrapper, { flex: 1, paddingVertical: 15, alignItems: "flex-start", paddingLeft: 15 }]}>
                                {deliveryDate && <SmallLabel left={20} text='Date delivrance' />}
                                <Text style={{ color: deliveryDate ? colors.black : colors.gray }}> {deliveryDate ? format(deliveryDate, 'dd/MM/yyyy') : "Date de délivrance"}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.input_wrapper}>
                            {inputs?.documentLicensingAuthority && <SmallLabel text='Autorité de délivrance' left={18} />}
                            <TextInput value={inputs?.documentLicensingAuthority} onChangeText={(text) => handleChangeMobile("documentLicensingAuthority", text, setInputs)} placeholder={"Autorité de délivrance"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>


                        <TouchableWithoutFeedback onPress={() => { openModal("expire"); setExpireDate(new Date()) }}>
                            <View style={[styles.input_wrapper, { flex: 1, paddingVertical: 15, alignItems: "flex-start", paddingLeft: 15 }]}>
                                {expireDate && <SmallLabel left={20} text="Date d'expiration" />}
                                <Text style={{ color: expireDate ? colors.black : colors.gray }}> {expireDate ? format(expireDate, 'dd/MM/yyyy') : "Date d’expiration"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Spacer />
                </View>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_validate} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>
            </Container>

            <Modal isVisible={visible} animationIn={"slideInUp"} animationOut={"bounceOut"} animationInTiming={500} animationOutTiming={1500} onBackdropPress={() => setVisible(false)}>
                {typeModal === "document" &&
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
                }
                {typeModal === "delivery" &&
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.date_modal}>
                            <DatePicker
                                date={deliveryDate as Date}
                                onDateChange={(_date) => { setDeliveryDate(_date); setSelectDate(true) }}
                                mode="date"
                                style={{ backgroundColor: "white" }}
                                textColor={colors.black}
                            />
                            <TouchableOpacity activeOpacity={0.8} onPress={() => openModal("delivery")} style={[styles.date_button, { width: "84%", }]}>
                                <Text style={{ color: colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                }

                {typeModal === "expire" &&
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.date_modal}>
                            <DatePicker
                                date={expireDate as Date}
                                onDateChange={(_date) => { setExpireDate(_date); setSelectDate(true) }}
                                mode="date"
                                style={{ backgroundColor: "white" }}
                                textColor={colors.black}
                            />
                            <TouchableOpacity activeOpacity={0.8} onPress={() => openModal("delivery")} style={[styles.date_button, { width: "84%", }]}>
                                <Text style={{ color: colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </Modal>


        </Wrapper>
    )
}

export default Document


const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    buttons: { gap: 15, width: "90%", alignItems: "center" },
    btn: { padding: 8, paddingVertical: 15, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", textAlign: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 14, color: colors.white, fontFamily: roboto.bold },
    uploadedbox: { width: "90%", },
    uploadedImg: { width: "100%", height: 120, marginBottom: 20, borderRadius: 15, resizeMode: "cover" },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    input_wrapper: { backgroundColor: colors.white, width: "100%", borderRadius: 15, overflow: "hidden", position: "relative" },
    input: { paddingLeft: 15, color: colors.black, backgroundColor: colors.white, width: "100%", alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    date_modal: { alignItems: "center", justifyContent: "center", height: "100%", },
    date_button: { width: "100%", padding: 15, backgroundColor: colors.fond1, justifyContent: "center", alignItems: "center", marginVertical: 10 },

})