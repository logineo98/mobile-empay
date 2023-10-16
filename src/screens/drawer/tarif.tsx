import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import { colors, roboto } from '../../libs/typography/typography'
import tarifs from '../../libs/json/tarif.json'
import TarifCard from '../../components/card/drawer/tarif_card'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Tarif: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    return (
        <ScreenContainer2 title='Tarif' navigation={navigation}>
            <View style={styles.tarif_container}>
                <Text style={styles.presentation}>Présentation des frais globaux de la carte</Text>

                <FlatList
                    data={tarifs}
                    renderItem={({ item }) => <TarifCard data={item} />}
                    keyExtractor={item => item?.id as string}
                    showsVerticalScrollIndicator={false}
                    style={{ height: height - (142 + 16 + 40 + 21), }}
                />
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    tarif_container: { paddingHorizontal: 20, },

    presentation: { color: colors.drawer_icon_color, fontSize: 16, fontFamily: roboto.black, textAlign: 'center', marginVertical: 20, },
})

export default Tarif