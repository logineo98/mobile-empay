import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import Container from '../../../components/common/container'
import Wrapper from '../../../components/common/wrapper'
import Spacer from '../../../components/common/spacer'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { useNavigation } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { userModel } from '../../../libs/services/user/user.model'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import ToastContainer from '../../../components/common/toast'
import SmallLabel from '../../../components/common/small_label'

const Infos = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const [modalVisible, setModalVisible] = useState(false)
    const [selectDate, setSelectDate] = useState(false);
    const [error, setError] = useState("");
    const [haveAccount, setHaveAccount] = useState(false);
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [next, setNext] = useState(false);
    const initial: userModel = { phone: "", name: "", firstname: "", birthday: "", address: "", email: "" }
    const [inputs, setInputs] = useState(initial);
    const [store, setStore] = useState<userModel>();



    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("infosSupp"); setNext(false); } }, [next, store]);

    useEffect(() => { if (selectDate) setInputs(old => { return { ...old, birthday: `${birthday}` } }) }, [selectDate, birthday]);

    //display modal
    const toggleModal = () => setModalVisible(!modalVisible)


    //traitement of login
    const handle_register_info = () => {

        inputs.birthday = birthday ? `${birthday}` : ""
        if (inscription_inputs_request("infos", inputs, setError)) return;

        setStore(inputs)
        setNext(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });


    return (
        <Wrapper image imageData={images.register_bg_img}  >
            <ToastContainer />
            <Container scoll position={"between"} style={{ alignItems: "center", }}>
                <>
                    <Spacer />
                    <View><Image source={images.logo_white} style={styles.logo} /></View>

                    <Spacer />

                    <View style={styles.descriptionbox}>
                        <Text style={styles.title}>Inscription</Text>
                        <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                    </View>


                    <Spacer />

                    <View style={styles.forms}>
                        <View style={{ width: "100%", flexDirection: "row", gap: 5, }}>
                            <View style={[{ width: "20%", backgroundColor: colors.white, borderRadius: 15, alignItems: "center", justifyContent: "center" }]}><Text style={{ color: colors.black }} >+223</Text></View>

                            <View style={[styles.input_wrapper, { flex: 1 }]}>
                                {inputs?.phone && <SmallLabel text='Numéro de téléphone' left={18} />}
                                <TextInput value={inputs.phone} onChangeText={(text) => handleChangeMobile("phone", text, setInputs)} placeholder='Numéro de téléphone' keyboardType="phone-pad" placeholderTextColor={colors.gray} style={[styles.input, { flex: 1 }]} />
                            </View>
                        </View>
                        <View style={styles.input_wrapper}>
                            {inputs?.name && <SmallLabel text='Nom' left={18} />}
                            <TextInput value={inputs.name} onChangeText={(text) => handleChangeMobile("name", text, setInputs)} placeholder={"Nom"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.firstname && <SmallLabel text='Prénom' left={18} />}
                            <TextInput value={inputs.firstname} onChangeText={(text) => handleChangeMobile("firstname", text, setInputs)} placeholder={"Prénom"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        {/* <TouchableWithoutFeedback onPress={toggleModal}>
                            <View style={[styles.input, { flex: 1, paddingVertical: 9, alignItems: "flex-start", paddingLeft: 15 }]}><Text style={{ color: colors.gray }}> {inputs?.birthday ? format((inputs as any).age, 'dd/MM/yyyy') : "Date de naissance"}</Text></View>
                        </TouchableWithoutFeedback> */}

                        <TouchableWithoutFeedback onPress={() => { toggleModal(); setBirthday(new Date()) }}>
                            <View style={[styles.input_wrapper, { flex: 1, paddingVertical: 15, alignItems: "flex-start", paddingLeft: 15 }]}>
                                {birthday && <SmallLabel left={20} text="Date de naissance" />}
                                <Text style={{ color: birthday ? colors.black : colors.gray }}> {birthday ? format(birthday, 'dd/MM/yyyy') : "Date de naissance"}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.input_wrapper}>
                            {inputs?.address && <SmallLabel text='Adresse' left={18} />}
                            <TextInput value={inputs.address} onChangeText={(text) => handleChangeMobile("address", text, setInputs)} placeholder={"Adresse"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={styles.input_wrapper}>
                            {inputs?.email && <SmallLabel text='Email' left={18} />}
                            <TextInput value={inputs.email} onChangeText={(text) => handleChangeMobile("email", text, setInputs)} placeholder={"Email"} placeholderTextColor={colors.gray} style={styles.input} />
                        </View>

                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                            <View style={[styles.input_wrapper, { flex: 1, paddingVertical: 15, paddingLeft: 10, alignItems: "flex-start" }]}>
                                <Text style={{ color: colors.gray }}>Avez-vous un compte UBA ?</Text>
                            </View>
                            <TouchableOpacity onPress={() => setHaveAccount(true)} activeOpacity={0.8} style={{ padding: 15, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: haveAccount ? "blue" : colors.gray }}>Oui</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setHaveAccount(false)} activeOpacity={0.8} style={{ padding: 15, borderRadius: 15, backgroundColor: colors.white }}><Text style={{ color: !haveAccount ? "blue" : colors.gray }}>Non</Text></TouchableOpacity>
                        </View>
                        {haveAccount &&
                            <View style={styles.input_wrapper}>
                                {inputs?.account && <SmallLabel text='Numéro de compte UBA' left={18} />}
                                <TextInput value={inputs.account} onChangeText={(text) => handleChangeMobile("account", text, setInputs)} placeholder={"Numéro de compte UBA"} placeholderTextColor={colors.gray} style={styles.input} />
                            </View>
                        }
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
                                date={birthday as Date}
                                onDateChange={(_date) => { setBirthday(_date); setSelectDate(true) }}
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
    // input: { paddingLeft: 15, color: colors.black, padding: 5, backgroundColor: colors.white, width: "100%", borderRadius: 15, alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    registerBtn: { marginTop: 2, backgroundColor: colors.ika_wari_taa_bg_color, width: "35%", borderRadius: 15, alignItems: "center", padding: 2 },
    actionBtn: { alignSelf: "flex-end", width: 50, height: 50, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 },
    btnImage: { width: 80, height: 80, resizeMode: "contain" },
    button: { width: "100%", padding: 15, backgroundColor: colors.fond1, justifyContent: "center", alignItems: "center", marginVertical: 10 },
    modal: { alignItems: "center", justifyContent: "center", backgroundColor: ' rgba(0,0,0,0.1)', height: "100%", },
    input_wrapper: { backgroundColor: colors.white, width: "100%", borderRadius: 15, overflow: "hidden", position: "relative" },
    input: { paddingLeft: 15, color: colors.black, backgroundColor: colors.white, width: "100%", alignItems: "center", fontFamily: roboto.medium, fontSize: 13 },
})