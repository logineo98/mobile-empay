import { Image, StyleProp, StyleSheet, Text, View, ViewStyle, useWindowDimensions } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import CustomLinearGradient from '../../common/drawer/gradient/custom_linear_gradient'
import { images } from '../../../libs/constants/constants'
import { RootState } from '../../../libs/services/store'
import { getAllHistorys, resetHistory } from '../../../libs/services/history/history.action'
import Loading from '../../common/drawer/others/loading'
import ErrorServer from '../../common/drawer/others/error_server'
import NoElement from '../../common/drawer/others/no_element'
import { PARTNER_TYPE } from '../../../libs/services/partner/partner.model'
import { _end_point } from '../../../libs/services/endpoints'
import { RECHARGE_TYPE } from '../../../libs/services/history/history.model'

type COMPONENT_TYPE = { screenName: string, displayVisaCard?: boolean, style?: StyleProp<ViewStyle> }

const HistoriqueCard: FC<COMPONENT_TYPE> = (props) => {
    const { screenName, displayVisaCard, style } = props

    const { height, width } = useWindowDimensions()

    const { host, } = useSelector((state: RootState) => state.user)
    const { loadingHistory, allHistorys, errorHistory } = useSelector((state: RootState) => state.history)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (screenName === undefined || screenName === 'home') host && dispatch(getAllHistorys(host.id as string))
        else dispatch(resetHistory())
    }, [screenName])

    return (
        <View style={[styles.historique_item_container, style, {}]}>
            {(loadingHistory || allHistorys === null) ?
                <View style={{ minHeight: 260 }}>
                    <Loading />
                </View> :
                errorHistory ? <ErrorServer height={260} message={`Une erreur est survenue lors de la récupération des historiques.`} /> :
                    allHistorys.length === 0 ? <NoElement height={260} message={`Aucune donnée d'historique n'a été trouvée pour le moment.`} /> :
                        <>
                            {allHistorys.map((history, i) => (
                                <View style={styles.historique_item} key={i}>
                                    <View style={styles.historique_item_icon_type_description_container}>
                                        <View style={styles.historique_item_icon_container}>
                                            {(history as PARTNER_TYPE).logo ?
                                                <Image source={{ uri: `${_end_point.api_img}/${(history as PARTNER_TYPE).logo}` }} style={styles.historique_item_icon} /> :
                                                <Image source={images.coin} tintColor={colors.black} style={styles.historique_item_icon} />
                                            }
                                        </View>
                                        <View style={styles.historique_item_type_description_container}>
                                            <Text style={styles.historique_item_type}>{(history as PARTNER_TYPE).logo ? 'Partenaire' : (history as RECHARGE_TYPE).transactionType}</Text>
                                            {(history as PARTNER_TYPE).logo ?
                                                <Text numberOfLines={1} style={styles.historique_item_description}>{(history as PARTNER_TYPE).name}</Text> :
                                                (history as RECHARGE_TYPE).message === null ?
                                                    <Text style={styles.historique_item_description}>
                                                        {(history as RECHARGE_TYPE).paymentStatus === 'PENDING' ? 'En cours' :
                                                            (history as RECHARGE_TYPE).paymentStatus === 'SUCCESS' ? 'Succès' :
                                                                (history as RECHARGE_TYPE).paymentStatus === 'CANCELED' ? 'Annulé' : 'Echoué'
                                                        }
                                                    </Text> :
                                                    <></>
                                            }
                                        </View>
                                    </View>
                                    <Text style={styles.historique_amount}>
                                        {(history as PARTNER_TYPE).logo ? '' : `${(history as RECHARGE_TYPE).amount} FCFA`}
                                    </Text>
                                </View>
                            ))}

                            {/* {allHistorys[2] &&
                                <CustomLinearGradient style={styles.historique_item}>
                                    <View style={styles.historique_item_icon_type_description_container}>
                                        <View style={styles.historique_item_icon_container}>
                                            <Image source={images.restaurant} tintColor={colors.black} style={styles.historique_item_icon} />
                                        </View>
                                        <View style={styles.historique_item_type_description_container}>
                                            <Text style={styles.historique_item_type}>Restaurant</Text>
                                            <Text style={styles.historique_item_description}>Paiement par carte</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.historique_amount}>-12.500 FCFA</Text>
                                </CustomLinearGradient>
                            } */}
                        </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    historique_item_container: {},
    historique_item: { padding: 15, borderRadius: 30, borderWidth: 1, borderColor: colors.fond1, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.profil_bg_color, },
    historique_item_icon_type_description_container: { flexDirection: 'row', alignItems: 'center', },
    historique_item_icon_container: { height: 45, width: 45, padding: 10, borderRadius: 45, backgroundColor: colors.white, },
    historique_item_icon: { height: '100%', width: '100%', objectFit: 'cover', borderRadius: 45, },
    historique_item_type_description_container: { marginLeft: 10, },
    historique_item_type: { color: colors.black, fontFamily: roboto.black, textTransform: 'capitalize', },
    historique_item_description: { color: colors.black, fontSize: 8, fontFamily: roboto.regular, },
    historique_amount: { color: colors.black, fontFamily: roboto.regular, },
})

export default HistoriqueCard