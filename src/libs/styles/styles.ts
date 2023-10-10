export const drawer = {

}

import { StyleSheet } from "react-native";
import { colors, roboto } from "../typography/typography";



const connexion = StyleSheet.create({

    connexion_container: { height: '90%', justifyContent: "flex-end" },
    content: { gap: 15, flex: 1, justifyContent: "center", width: "100%", },
    logobox: { height: '25%', alignItems: 'center', justifyContent: 'center' },
    logo: { width: '90%', height: '90%', resizeMode: 'contain' },
    title: { fontFamily: roboto.bold, textAlign: 'center', color: colors.black },
    description: { fontFamily: roboto.thin, textAlign: 'center', color: colors.black },

    inputbox: { gap: 10, width: '100%' },
    inputfield: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.placeholder, },
    inputicon: { color: colors.auth_icon },
    input: { flex: 1, color: colors.black },
    errortext: { paddingRight: 5, color: "tomato", alignSelf: 'flex-end', fontFamily: roboto.boldItalic, fontSize: 9 },

    linkbox: { alignItems: 'center', justifyContent: 'center' },
    registerbtn: { backgroundColor: colors.black, },
    registerbtn_txt: { color: colors.white, textAlign: 'center', fontFamily: roboto.light },
    forgot_txt: { color: colors.black, textAlign: 'center', fontFamily: roboto.thin, },

    footer: { alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 0 },
    loginbtn: { height: 55, width: 55, borderRadius: 55, backgroundColor: colors.fond1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    loginbtn_txt: { color: colors.white, fontSize: 24 },
    verifycell: { borderRadius: 4, alignItems: 'center', justifyContent: 'center', lineHeight: 60, fontSize: 28, borderWidth: 2, borderColor: colors.auth_icon, textAlign: 'center', color: colors.black },
    verifyfocusCell: { borderColor: colors.fond1, color: colors.fond1 },
    btnscontainer: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },

    //compte
    accounttitle: { color: colors.black },
    radio: { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 5 },

    //document
    documentimgbox: { height: 180, width: "100%", alignItems: 'center', justifyContent: 'center' },
    documentimg: { width: '100%', height: '100%', resizeMode: 'cover' },
    documentbtn: { backgroundColor: colors.black, padding: 14, borderRadius: 4, alignItems: 'center' },
    btntext: { color: colors.white, fontFamily: roboto.thin, fontSize: 17 },

    //photo
    photoiconbtn: { zIndex: 1, position: 'absolute', right: '10%', top: '8%', backgroundColor: colors.black, height: 55, width: 55, borderRadius: 55, alignItems: 'center', justifyContent: 'center', },
    photoicon: { fontSize: 35, color: colors.white },
    selfiebox: { alignItems: 'center', position: 'relative' },
    selfiezone: { overflow: "hidden" },
    selfieimg: { width: '100%', height: '100%', resizeMode: "contain" },

    //signature
    signaturebtn: { color: colors.white },
    signature: { flex: 1, borderColor: '#000033', borderWidth: 1, },
    buttonStyle: { flex: 1, justifyContent: "center", alignItems: "center", padding: 14, backgroundColor: colors.black, borderRadius: 4, marginTop: 2, fontFamily: roboto.light },
    signaturebox: { alignItems: 'center' },
    signaturezone: { borderColor: colors.placeholder },
})


const welcome = StyleSheet.create({
    welcomebgimg: { flex: 1 },
    welcome_container: { flex: 1, height: '90%', justifyContent: "flex-end" },
    content: { gap: 10 },
    logobox: { height: '35%', alignItems: 'center', justifyContent: 'center' },
    logo: { width: '100%', height: '100%', resizeMode: 'contain' },
    textbox: { gap: 5, marginVertical: '5.5%' },
    title: { fontFamily: roboto.bold, textAlign: 'center', color: colors.black },
    description: { fontFamily: roboto.light, textAlign: 'center', color: colors.black },

    inputbox: { gap: 10 },
    inputfield: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.placeholder, borderRadius: 4, paddingHorizontal: 5 },
    inputicon: { fontSize: 22, color: colors.auth_icon },
    input: { flex: 1, paddingHorizontal: 6, },
    errortext: { paddingRight: 5, color: "tomato", alignSelf: 'flex-end', fontFamily: roboto.boldItalic, fontSize: 9 },

    accounttitle: { color: colors.black },
    radio: { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 5 },

    documentbtn: {
        backgroundColor: colors.black, padding: 14, borderRadius: 4, alignItems: 'center'
    },
    btntext: { color: colors.white, fontFamily: roboto.light, fontSize: 17 }
})

export const css = {
    auth: {
        connexion, welcome
    }
}