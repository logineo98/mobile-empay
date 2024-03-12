import { PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import Geolocation from '@react-native-community/geolocation'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import { colors, roboto } from '../../libs/typography/typography'
import { RootState } from '../../libs/services/store'
import NoPermissionCard from '../../components/card/drawer/no_permission_card'
import { STATUS_TYPE } from '../../libs/services/user/user.model'
import { status_geo_montant_validation } from '../../libs/services/user/user.request'
import { checking, send_status_geo_montant } from '../../libs/services/user/user.action'
import Loading from '../../components/common/drawer/others/loading'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Status: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const data: STATUS_TYPE = { id: '', la: '', lo: '', AmountToExchange: '' }

    const { host, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const [granted, setGranted] = useState(false)
    const [dataToSend, setDataToSend] = useState(data)
    const [isSwitchActive, setIsSwitchActive] = useState(false)
    const [err, setErr] = useState<{ montant: string }>()

    const handleSwitchBtn = (value: boolean) => {
        const { error, initialError } = status_geo_montant_validation(dataToSend.AmountToExchange, host?.totalAmount as number)

        if (error.montant !== initialError.montant) {
            setErr(error)
            setIsSwitchActive(false)
        } else {
            setErr(initialError)
            setIsSwitchActive(value)

            if (value) dispatch(send_status_geo_montant(dataToSend))
            else {
                dispatch(send_status_geo_montant({ id: host?.id, la: '', lo: '', AmountToExchange: '0', disable: true }))
                setDataToSend({ ...dataToSend, AmountToExchange: '' })
            }
        }
    }

    useEffect(() => {
        if (screenName === 'status') {
            setErr({ montant: '' });

            (async () => {
                const geolocalisationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                setGranted(geolocalisationPermission === 'granted')

                if (granted) {
                    Geolocation.getCurrentPosition(info => {
                        if (host?.AmountToExchange && host?.AmountToExchange > 0 && host?.coordinates?.lat && host?.coordinates?.lng) {
                            setIsSwitchActive(true)
                            if (host?.coordinates?.lat !== info.coords.latitude.toString() || host?.coordinates?.lng !== info.coords.longitude.toString())
                                setDataToSend({ id: host?.id, AmountToExchange: host?.AmountToExchange.toString(), la: info.coords.latitude.toString(), lo: info.coords.longitude.toString() })
                            else setDataToSend({ id: host?.id, AmountToExchange: host?.AmountToExchange.toString(), la: host?.coordinates.lat, lo: host?.coordinates.lng })
                        } else {
                            setIsSwitchActive(false)
                            setDataToSend({ id: host?.id, AmountToExchange: '', la: info.coords.latitude.toString(), lo: info.coords.longitude.toString() })
                        }
                    })
                }
            })()
        }
    }, [screenName, granted])

    useEffect(() => {
        if (screenName === 'status') dispatch(checking())
    }, [screenName])

    return (
        <ScreenContainer3 title='Statut/Disponibilité' isSwitchActive={isSwitchActive} handleSwitchBtn={handleSwitchBtn} navigation={navigation}>
            {/* quand la permission n'est pas donnée a la géolocalisation */}
            {!granted ? <NoPermissionCard permission_type='à la géolocalisation' style={styles.no_permission} /> :
                user_loading ? <Loading text='Traitement en cours...' /> :
                    <View style={styles.status_container}>
                        {/* montant à retirer */}
                        <View style={styles.amount_to_retirer_title_container}>
                            <Text style={styles.amount_to_retirer_title}>Inscrire le montant à échanger</Text>
                            <TextInput keyboardType='numeric' placeholder='0' placeholderTextColor={colors.white} editable={!isSwitchActive} value={dataToSend?.AmountToExchange} onChangeText={text => setDataToSend({ ...dataToSend, AmountToExchange: text })} style={[styles.amount_input, { backgroundColor: isSwitchActive ? colors.profil_bg_color : 'transparent', color: isSwitchActive ? colors.black : colors.white, }]} />
                            <Text style={[styles.fcfa, { bottom: err?.montant ? 27 : 12, }]}>FCFA</Text>
                            {err?.montant && <Text style={styles.error}> {err?.montant} </Text>}
                        </View>

                        {/* texte d'information */}
                        <Text style={styles.text_information}>En activant votre statut vous émettez le souhait d'un retrait d'argent du montant inscrit dans le champ ci-dessus.</Text>

                        {/* retour et valider */}
                        {/* <View style={styles.back_validate_container}>
                            <TouchableOpacity activeOpacity={0.5} style={[styles.back_validate, { padding: 10, }]}>
                                <Text style={styles.back_validate_name}>Retour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={styles.back_validate}>
                                <CustomLinearGradient style={styles.validate_gradient}>
                                    <Text style={[styles.back_validate_name, { color: colors.black, }]}>Valider</Text>
                                </CustomLinearGradient>
                            </TouchableOpacity>
                        </View> */}
                    </View>
            }
        </ScreenContainer3>
    )
}

const styles = StyleSheet.create({
    status_container: { flex: 1, },

    // montant à retirer
    amount_to_retirer_title_container: { marginVertical: 60, position: 'relative', },
    amount_to_retirer_title: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', marginBottom: 10, },
    amount_input: { width: '100%', paddingLeft: 30, paddingRight: 75, borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, fontFamily: roboto.regular, },
    fcfa: { position: 'absolute', right: 15, color: colors.white, fontSize: 20, fontFamily: roboto.regular, },
    error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, textAlign: 'left', },

    // texte d'information
    text_information: { color: colors.white, fontSize: 13, fontFamily: roboto.regular, textAlign: 'center', marginBottom: 20, },

    // retour et valider
    back_validate_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', },
    back_validate: { width: 130, backgroundColor: colors.profil_bg_color, borderRadius: 20, },
    back_validate_name: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
    validate_gradient: { padding: 10, borderRadius: 20, },

    // quand la permission n'est pas donnée a la géolocalisation
    no_permission: {},
})

export default Status