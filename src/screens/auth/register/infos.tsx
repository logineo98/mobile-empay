import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { userModel } from '../../../libs/services/user/user.model'
import { RootState } from '../../../libs/services/store'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import ToastContainer from '../../../components/common/toast'

const Infos = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectDate, setSelectDate] = useState(false);
    const [error, setError] = useState("");
    const [haveAccount, setHaveAccount] = useState(false);
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const initial: userModel = { phone: "", name: "", firstname: "", birthday: "", address: "", email: "", age: new Date(new Date().getTime()) }
    const [inputs, setInputs] = useState(initial);
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

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("document"); setNext(false); setClick(false) } }, [next, store]);

    useEffect(() => { if (selectDate) setInputs(old => { return { ...old, birthday: `${inputs?.age}` } }) }, [selectDate]);

    //display modal
    const toggleModal = () => setModalVisible(!modalVisible)


    //traitement of login
    const handle_register_info = () => {

        if (inscription_inputs_request("infos", inputs, setError)) return;

        setStore(inputs)
        setNext(true)
        setClick(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_bg_img}  >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", }}>
                <>
                    <Spacer />
                    <View><Image source={images.logo_png} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Inscription</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <View style={{ flexDirection: "row", gap: 5, }}>
                            <View style={[{ width: "20%", backgroundColor: colors.white, borderRadius: 15, alignItems: "center", justifyContent: "center" }]}><Text style={{ color: colors.black }} >+223</Text></View>
                            <TextInput value={inputs.phone} onChangeText={(text) => handleChangeMobile("phone", text, setInputs)} placeholder='Numéro de téléphone' keyboardType="phone-pad" placeholderTextColor={colors.gray} style={[styles.input, { flex: 1 }]} />
                        </View>
                        <TextInput value={inputs.name} onChangeText={(text) => handleChangeMobile("name", text, setInputs)} placeholder={"Nom"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput value={inputs.firstname} onChangeText={(text) => handleChangeMobile("firstname", text, setInputs)} placeholder={"Prénom"} placeholderTextColor={colors.gray} style={styles.input} />

                        <TouchableWithoutFeedback onPress={toggleModal}>
                            <View style={[styles.input, { flex: 1, paddingVertical: 9, alignItems: "flex-start", paddingLeft: 15 }]}><Text style={{ color: colors.gray }}> {inputs?.birthday ? format((inputs as any).age, 'dd/MM/yyyy') : "Date de naissance"}</Text></View>
                        </TouchableWithoutFeedback>

                        {/* <TextInput value={inputs.birthday} onChangeText={(text) => handleChangeMobile("birthday", text, setInputs)} placeholder={"Date de naissance"} placeholderTextColor={colors.gray} style={styles.input} /> */}
                        <TextInput value={inputs.address} onChangeText={(text) => handleChangeMobile("address", text, setInputs)} placeholder={"Adresse"} placeholderTextColor={colors.gray} style={styles.input} />
                        <TextInput value={inputs.email} onChangeText={(text) => handleChangeMobile("email", text, setInputs)} placeholder={"Email"} placeholderTextColor={colors.gray} style={styles.input} />
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <View style={[styles.input, { flex: 1, paddingVertical: 9 }]}><Text style={{ color: colors.gray }}>Avez-vous un compte UBA ?</Text></View>
                            <TouchableOpacity onPress={() => setHaveAccount(true)} activeOpacity={0.8} style={{ padding: 8, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: haveAccount ? "blue" : colors.gray }}>Oui</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setHaveAccount(false)} activeOpacity={0.8} style={{ padding: 8, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: !haveAccount ? "blue" : colors.gray }}>Non</Text></TouchableOpacity>
                        </View>
                        {haveAccount && <TextInput value={inputs.account} onChangeText={(text) => handleChangeMobile("account", text, setInputs)} placeholder={"Numéro de compte UBA"} placeholderTextColor={colors.gray} style={styles.input} />}
                    </View>
                    <Spacer />
                </>
                <Animated.View style={[animatedStyle, { alignSelf: "flex-end" }]}>
                    <TouchableOpacity onPress={handle_register_info} activeOpacity={0.8} style={styles.actionBtn}><Image source={images.auth_action} style={styles.btnImage} /></TouchableOpacity>
                </Animated.View>


                <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} style={{ alignItems: "center" }}>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modal}>
                            <DatePicker
                                date={(inputs as any).age}
                                onDateChange={(_date) => { setInputs({ ...inputs, age: _date }); setSelectDate(true) }}
                                mode="date"
                                style={{ backgroundColor: "white" }}
                                textColor={colors.black}
                            />
                            <TouchableOpacity onPress={toggleModal} style={[styles.button, { width: "75%", }]}>
                                <Text style={{ color: colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </Container>
        </Wrapper >
    )
}

export default Infos

const styles = StyleSheet.create({
    logo: { width: 95, height: 95, tintColor: colors.white },
    forms: { gap: 15, width: "90%", alignItems: "center" },
    input: { paddingLeft: 15, color: colors.black, padding: 5, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    button: { width: "100%", padding: 15, backgroundColor: colors.fond1, justifyContent: "center", alignItems: "center", marginVertical: 10 },
    modal: { alignItems: "center", justifyContent: "center", backgroundColor: ' rgba(0,0,0,0.1)', height: "100%", },
})