import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/screen_container2'
import { images } from '../../libs/constants/constants'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Facture: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props


    return (
        <ScreenContainer2 title='Factures' scroll navigation={navigation}>
            <View style={styles.facture_container}>
                <View style={styles.first_ligne_container}>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.society_logo_container, { backgroundColor: colors.black, }]}>
                            <Image source={images.canal_plus} style={[styles.society_logo, { objectFit: 'contain', }]} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>Canal+</Text>
                    </View>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.society_logo_container}>
                            <Image source={images.edm} style={styles.society_logo} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>EDM s.a</Text>
                    </View>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.society_logo_container}>
                            <Image source={images.edm} style={styles.society_logo} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>Isago</Text>
                    </View>
                </View>

                <View style={styles.second_ligne_container}>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.society_logo_container}>
                            <Image source={images.somagep} style={styles.society_logo} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>Somagep</Text>
                    </View>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.society_logo_container}>
                            <Image source={images.startimes} style={styles.society_logo} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>StarTimes</Text>
                    </View>
                    <View style={styles.society_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.society_logo_container}>
                            <Image source={images.edm} style={styles.society_logo} />
                        </TouchableOpacity>
                        <Text style={styles.society_name}>Malivision</Text>
                    </View>
                </View>
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    facture_container: { padding: 20, },

    first_ligne_container: { flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', marginVertical: 60, },
    second_ligne_container: { flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', },

    society_container: { alignItems: 'center', },
    society_logo_container: { height: 85, width: 85, padding: 10, borderRadius: 20, backgroundColor: colors.white, },
    society_logo: { height: '100%', width: '100%', objectFit: 'cover', },
    society_name: { color: colors.white, fontSize: 16, fontFamily: roboto.regular, },

})

export default Facture