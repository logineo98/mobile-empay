import { ActivityIndicator, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/common/wrapper'
import Container from '../../components/common/container'
import { colors, roboto } from '../../libs/typography/typography'
import { images, videos } from '../../libs/constants/constants'
import Spacer from '../../components/common/spacer'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { checking } from '../../libs/services/user/user.action'
import Video from 'react-native-video';

const Welcome = () => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const { host } = useSelector((state: RootState) => state?.user)
    const [loading, setLoading] = useState(true);

    useEffect(() => { dispatch(checking()) }, [dispatch]);


    useEffect(() => {
        const timer = setTimeout(() => { setLoading(false) }, 1000)
        return () => clearTimeout(timer)
    }, []);


    if (loading && !host)
        return (
            <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, width: "100%", alignItems: "center", backgroundColor: colors.white }}>
                <StatusBar translucent backgroundColor={"transparent"} />
                <Image source={images.logo2} style={{ resizeMode: "cover", width: "100%" }} />
                <View style={{ flex: 1, backgroundColor: colors.white, width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={"large"} color={colors.gradient_color[0]} />
                </View>
            </View>
        )



    return (
        <Wrapper>
            <StatusBar translucent backgroundColor={"transparent"} />
            <Video source={videos.welcome} paused={false} repeat={true} resizeMode="cover" style={{ position: "absolute", height: "100%", top: 0, left: 0, right: 0, bottom: 0 }} />

            <Container scoll position={"around"} style={{ paddingTop: StatusBar.currentHeight, alignItems: "center", backgroundColor: "#b41354A1", height: "100%" }}>
                <Spacer />
                <View><Image source={images.logo_white} style={styles.logo} /></View>

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
    btn: { padding: 5, paddingVertical: 10, backgroundColor: colors.white, width: "75%", borderRadius: 15, alignItems: "center" },
    btnText: { fontFamily: roboto.medium, color: colors.black, fontSize: 17 },
    descriptionbox: { alignItems: "center", justifyContent: "center", gap: 8 },
    title: { fontSize: 28, color: colors.white, fontFamily: roboto.bold },
    description: { fontSize: 14, color: colors.white, fontFamily: roboto.regular },
    txtbox: { alignItems: 'center', justifyContent: 'center', marginTop: 15 },
    text: { fontSize: 12, color: colors.white },
})

