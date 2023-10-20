import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { BarChart, LineChart } from 'react-native-chart-kit'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import HistoriqueCard from '../../components/card/drawer/historique_card'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Historique: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    return (
        <ScreenContainer3 title='Historique' hide_switch navigation={navigation}>
            <View style={styles.historique_container}>
                {/* statistique recente */}
                <View style={styles.statistic_recent_container}>
                    <Text style={styles.statistic_recent_title}>Dépenses récentes sur mon compte</Text>
                    <BarChart
                        style={styles.statistic_recent}
                        data={{
                            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                            datasets: [{ data: [10, 20, 15, 12, 21, 18, 5], }]
                        }}
                        height={180}
                        width={width - (20 + 40 + 20)}
                        yAxisLabel=''
                        yAxisSuffix=''
                        showBarTops={false}
                        withHorizontalLabels={true}
                        withCustomBarColorFromData={true}
                        fromZero
                        chartConfig={{
                            backgroundGradientFrom: colors.profil_bg_color,
                            backgroundGradientFromOpacity: 1,
                            backgroundGradientTo: colors.profil_bg_color,
                            backgroundGradientToOpacity: 1,
                            color: (opacity = 1) => colors.screen_bg_color,
                            barPercentage: 0.55,
                            barRadius: 5,
                            decimalPlaces: 0,
                        }}
                    />
                </View>
                {/* historique card */}
                <HistoriqueCard style={styles.historique_card} />
                {/* statistique globale */}
                <View style={styles.statistic_global_container}>
                    <Text style={styles.statistic_global_title}>Historique Globale</Text>
                    <LineChart
                        style={styles.statistic_global}
                        data={{
                            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                            datasets: [{
                                data: [10, 20, 15, 12, 21, 18, 5, 8, 10, 4, 20, 25],
                                color: () => colors.drawer_icon_color,
                            }]
                        }}
                        height={180}
                        width={width - (20 + 40 + 20)}
                        bezier
                        getDotColor={() => colors.white}
                        withHorizontalLines={false}
                        chartConfig={{
                            backgroundGradientFrom: colors.drawer_bg_color,
                            backgroundGradientFromOpacity: 1,
                            backgroundGradientTo: colors.drawer_bg_color,
                            backgroundGradientToOpacity: 1,
                            color: (opacity = 1) => colors.white,
                            barPercentage: 0.55,
                            barRadius: 5,
                            decimalPlaces: 0,
                        }}
                    />
                </View>
            </View>
        </ScreenContainer3>
    )
}

const styles = StyleSheet.create({
    historique_container: {},

    historique_card: {},

    // statistique recente
    statistic_recent_container: { marginVertical: 15, padding: 10, borderWidth: 2, borderColor: colors.drawer_icon_color, borderRadius: 30, alignItems: 'center', backgroundColor: colors.profil_bg_color, },
    statistic_recent_title: { color: colors.black, fontSize: 15, fontFamily: roboto.regular, marginBottom: 10, },
    statistic_recent: {},
    // statistique globale
    statistic_global_container: { marginTop: 10, padding: 10, borderWidth: 2, borderColor: colors.drawer_icon_color, borderRadius: 30, alignItems: 'center', backgroundColor: colors.drawer_bg_color, },
    statistic_global_title: { color: colors.white, fontSize: 15, fontFamily: roboto.regular, marginBottom: 10, },
    statistic_global: { borderColor: 'red' },

})

export default Historique