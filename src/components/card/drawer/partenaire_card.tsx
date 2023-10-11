import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
// my importations
import { PARTNER_TYPE } from '../../../libs/services/partner/partner.model'

type COMPONENT_TYPE = {
    data: PARTNER_TYPE
    index: number
}

const PartenaireCard: FC<COMPONENT_TYPE> = (props) => {
    const { data, index } = props
    const { id, name, description, logo } = data

    console.log(index)

    return (
        <View>
            <Text>PartenaireCard</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default PartenaireCard