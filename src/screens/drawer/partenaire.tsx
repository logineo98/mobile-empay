import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import { images } from '../../libs/constants/constants'
import PartenaireCard from '../../components/card/drawer/partenaire_card'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Partenaire: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const partenaires = [
        { id: '1', name: 'Yara Oil', description: `Plus qu'un transporteur, Yara Oil apporte son expertise d'entreprise malienne et son savoir faire, de la prise de commande à la livraison. En savoir plus.`, logo: images.edm },
        { id: '2', name: 'Brooklyn Burger', description: `Brooklyn Burger est un fast food de type américain situé à Bamako en plein coeur de l'ACI 2000 spécialisé dans les poulets frites et dans les burgers.`, logo: images.somagep },
        { id: '3', name: 'Soyatt', description: `La société SOYATT, spécialisée dans l'importation, exploitation de station service et la commercialisation des produits pétroliers.`, logo: images.startimes },
        { id: '4', name: 'Logineo', description: `LOGINEO est une société de service en ingénierie informatique fondée au Mali en Mai 2010. Chez LOGINEO, nous arborons un nouveau leitmotiv, <<KEEP IT SIMPLE>>.`, logo: images.passport },
        { id: '5', name: 'UBA', description: `UBA Mali est la toute derniére filiale du Groupe Panafricain UBA, présent dans plus de 20 pays en Afrique et à travers le monde.`, logo: images.vitepay },
    ]

    return (
        <ScreenContainer2 title='Nos Partenaires' navigation={navigation}>
            <FlatList
                data={partenaires}
                renderItem={({ item, index }) => <PartenaireCard data={item} index={index} />}
                keyExtractor={item => item?.id as string}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list_partenaire_container}
            />
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    list_partenaire_container: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 10, },
})

export default Partenaire