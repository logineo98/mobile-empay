import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import { colors, roboto } from '../../libs/typography/typography'
import TarifCard from '../../components/card/drawer/tarif_card'
import GradientText from '../../components/common/drawer/gradient/gradient_text'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { getAllTarifs, resetTarif } from '../../libs/services/tarif/tarif.action'
import Loading from '../../components/common/drawer/others/loading'
import NoElementFind from '../../components/common/drawer/others/no_element'
import ErrorServer from '../../components/common/drawer/others/error_server'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Tarif: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { height, width } = useWindowDimensions()

    const { loadingTarif, allTarifs, error } = useSelector((state: RootState) => state.tarif)
    const dispatch = useDispatch<any>()

    // quand on tire l'ecran vers le bas pour rafraichir
    const onRefresh = useCallback(() => {
        dispatch(getAllTarifs())
    }, [])

    useEffect(() => {
        if (screenName === 'tarif') dispatch(getAllTarifs())
        else dispatch(resetTarif())
    }, [screenName])

    return (
        <ScreenContainer2 title='Tarif' reload refreshing={false} onRefresh={onRefresh} navigation={navigation}>
            <View style={styles.tarif_container}>
                <GradientText text='Présentation des frais globaux de la carte' style={styles.presentation} />

                {(loadingTarif || allTarifs === null) ? <Loading color={colors.drawer_icon_color} /> :
                    error ? <ErrorServer message={`Une erreur est survenue lors de la récupération des tarifs.\nVeuillez actualiser l'écran en le tirant vers le bas.`} /> :
                        allTarifs.length === 0 ? <NoElementFind message='Aucun tarif trouvé.' /> :
                            allTarifs.map((tarif, index) => <TarifCard key={tarif.id} data={tarif} index={index} />)
                }
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    tarif_container: { flex: 1, paddingHorizontal: 20, },

    presentation: { fontSize: 15, fontFamily: roboto.black, textAlign: 'center', marginVertical: 20, },
})

export default Tarif