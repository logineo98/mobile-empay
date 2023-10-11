import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/screen_container2'
import { images } from '../../libs/constants/constants'
import PartenaireCard from '../../components/card/drawer/partenaire_card'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Partenaire: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const partenaires = [
        { id: '1', name: 'Yara Oil', description: `Plus qu'un transporteur, Yara Oil apporte son expertise d'entreprise malienne et son savoir faire, de la prise de commande à la livraison. En savoir plus.`, logo: images.edm },
        { id: '2', name: 'Yara Oil', description: `Plus qu'un transporteur, Yara Oil apporte son expertise d'entreprise malienne et son savoir faire, de la prise de commande à la livraison. En savoir plus.`, logo: images.edm },
        { id: '3', name: 'Yara Oil', description: `Plus qu'un transporteur, Yara Oil apporte son expertise d'entreprise malienne et son savoir faire, de la prise de commande à la livraison. En savoir plus.`, logo: images.edm },
        { id: '4', name: 'Yara Oil', description: `Plus qu'un transporteur, Yara Oil apporte son expertise d'entreprise malienne et son savoir faire, de la prise de commande à la livraison. En savoir plus.`, logo: images.edm },
    ]

    return (
        <ScreenContainer2 title='Nos Partenaires' navigation={navigation}>
            <FlatList
                data={partenaires}
                renderItem={({ item, index }) => <PartenaireCard data={item} index={index} />}
                keyExtractor={item => item?.id as string}
                showsVerticalScrollIndicator={false}
            />
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    partenaire_container: {},
})

export default Partenaire