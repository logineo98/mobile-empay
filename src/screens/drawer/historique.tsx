import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Historique: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    return (
        <ScreenContainer2 title='Historique' navigation={navigation}>

        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({

})

export default Historique