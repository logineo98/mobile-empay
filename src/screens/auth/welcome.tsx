import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Wrapper from '../../components/common/wrapper'
import Container from '../../components/common/container'
import { colors, roboto } from '../../libs/typography/typography'
import { images } from '../../libs/constants/constants'
import Spacer from '../../components/common/spacer'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { checking } from '../../libs/services/user/user.action'
import PrincipalLoader from '../../components/common/principal_loading'

const Welcome = () => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const { user_loading } = useSelector((state: RootState) => state?.user)

    useEffect(() => { dispatch(checking()) }, [dispatch]);

    if (user_loading)
        return <PrincipalLoader text='Veuillez patienter pendant le chargement des données.' />


    return (
        <Wrapper image imageData={images.welcome_bg_img}   >
            <Container scoll position={"around"} style={{ alignItems: "center" }}>
                <Spacer />
                <View><Image source={images.logo_png} style={styles.logo} /></View>

                <Spacer />

                <View style={styles.descriptionbox}>
                    <Text style={styles.title}>Bienvenue</Text>
                    <Text style={styles.description}>Gerer vos finances avec la neocarte EM</Text>
                </View>


                <Spacer />

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => navigation.navigate("infos")} activeOpacity={0.9} style={styles.btn}><Text style={styles.btnText}>Inscription</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("login")} activeOpacity={0.9} style={styles.btn}><Text style={styles.btnText}>Connexion</Text></TouchableOpacity>
                </View>
                <Spacer />
            </Container>
        </Wrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    logo: { width: 150, height: 150, tintColor: colors.white },
    buttons: { gap: 15, width: "100%", alignItems: "center" },
    btn: { padding: 5, backgroundColor: colors.white, width: "75%", borderRadius: 15, alignItems: "center" },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular }
})