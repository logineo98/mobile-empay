import { FlatList, StyleSheet, } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import PartenaireCard from '../../components/card/drawer/partenaire_card'
import { RootState } from '../../libs/services/store'
import { getAllPartners, getAllPartnersWithoutLoading } from '../../libs/services/partner/partner.action'
import NoElementFind from '../../components/common/drawer/others/no_element_find'
import Loading from '../../components/common/drawer/others/loading'
import { colors } from '../../libs/typography/typography'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Partenaire: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { loadingPartner, allPartners } = useSelector((state: RootState) => state.partner)
    const dispatch = useDispatch<any>()

    const [refreshing, setRefreshing] = useState(false)
    const [fois, setFois] = useState(0)

    // quand on tire l'ecran vers le bas pour rafraichir
    const onRefresh = useCallback(() => {
        dispatch(getAllPartners())
    }, [])

    useEffect(() => {
        if (loadingPartner === false) setRefreshing(false)
    }, [loadingPartner])

    useEffect(() => {
        if (screenName === 'partenaire') {
            if (fois === 0) {
                dispatch(getAllPartners())
                setFois(1)
            } else dispatch(getAllPartnersWithoutLoading())
        }
    }, [screenName])

    return (
        <ScreenContainer2 title='Nos Partenaires' reload refreshing={refreshing} onRefresh={onRefresh} navigation={navigation}>

            {loadingPartner ? <Loading color={colors.drawer_icon_color} /> :
                allPartners?.length === 0 ? <NoElementFind message='Aucun partenaire trouvé.' /> :
                    allPartners.map((partner, index) => <PartenaireCard key={partner?.id} data={partner} index={index} />)
            }
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    list_partenaire_container: { flexGrow: 1, paddingHorizontal: 20, },
})

export default Partenaire