import { FlatList, StyleSheet, } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import PartenaireCard from '../../components/card/drawer/partenaire_card'
import { RootState } from '../../libs/services/store'
import { getAllPartners, resetPartner } from '../../libs/services/partner/partner.action'
import NoElement from '../../components/common/drawer/others/no_element'
import Loading from '../../components/common/drawer/others/loading'
import { colors } from '../../libs/typography/typography'
import ErrorServer from '../../components/common/drawer/others/error_server'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Partenaire: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { loadingPartner, allPartners, error } = useSelector((state: RootState) => state.partner)
    const dispatch = useDispatch<any>()

    // quand on tire l'ecran vers le bas pour rafraichir
    const onRefresh = useCallback(() => {
        dispatch(getAllPartners())
    }, [])

    useEffect(() => {
        if (screenName === 'partenaire') dispatch(getAllPartners())
        else dispatch(resetPartner())
    }, [screenName])

    return (
        <ScreenContainer2 title='Nos Partenaires' reload refreshing={false} onRefresh={onRefresh} navigation={navigation}>
            {(loadingPartner || allPartners === null) ? <Loading color={colors.drawer_icon_color} /> :
                error ? <ErrorServer message={`Une erreur est survenue lors de la récupération des partenaires.\nVeuillez actualiser l'écran en le tirant vers le bas.`} /> :
                    allPartners.length === 0 ? <NoElement message='Aucun partenaire trouvé.' /> :
                        allPartners.map((partner, index) => <PartenaireCard key={partner?.id} data={partner} index={index} />)
            }
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    list_partenaire_container: { flexGrow: 1, paddingHorizontal: 20, },
})

export default Partenaire