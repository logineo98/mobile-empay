import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { BarChart, LineChart } from 'react-native-chart-kit'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import HistoriqueCard from '../../components/card/drawer/historique_card'
import { colors, roboto } from '../../libs/typography/typography'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { getAllHistorys, getTransactionsYear, getTransactionsDays, resetHistorySemYear } from '../../libs/services/history/history.action'
import Loading from '../../components/common/drawer/others/loading'
import ErrorServer from '../../components/common/drawer/others/error_server'
import NoElement from '../../components/common/drawer/others/no_element'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, screenName: string }

const Historique: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { height, width } = useWindowDimensions()

    const { host, } = useSelector((state: RootState) => state.user)
    const { loadingTransactionDay, loadingTransactionYear, allTransactionsDays, allTransactionsYear, errorTransactionDay, errorTransactionYear } = useSelector((state: RootState) => state.history)
    const dispatch = useDispatch<any>()

    const [refreshing, setRefreshing] = useState(false)

    // quand on tire l'ecran vers le bas pour rafraichir
    const onRefresh = useCallback(() => {
        host && dispatch(getTransactionsDays(host.id as string))
        host && dispatch(getTransactionsYear(host.id as string, '2024'))
    }, [])

    useEffect(() => {
        if (loadingTransactionDay === false && loadingTransactionYear === false) setRefreshing(false)
    }, [loadingTransactionDay, loadingTransactionYear])

    useEffect(() => {
        if (screenName === 'historique') {
            host && dispatch(getTransactionsDays(host.id as string))
            host && dispatch(getTransactionsYear(host.id as string, '2024'))
        } else dispatch(resetHistorySemYear())
    }, [screenName])

    return (
        <ScreenContainer3 title='Historique' reload hide_switch refreshing={refreshing} onRefresh={onRefresh} navigation={navigation}>
            <View style={styles.historique_container}>
                {/* statistique recente semaine */}
                {(loadingTransactionDay || allTransactionsDays === null) ?
                    <View style={{ minHeight: 210, marginVertical: 15, padding: 10, }}>
                        <Loading style_text_container={{ color: colors.white }} />
                    </View> :
                    errorTransactionDay ? <ErrorServer height={200} message={`Une erreur est survenue lors de la récupération des transactions de la semaine.\nVeuillez actualiser l'écran en le tirant vers le bas.`} /> :
                        allTransactionsDays.length === 0 ? <NoElement height={200} message={`Aucune transaction n'a été effectuée cette semaine.`} /> :

                            <View style={styles.statistic_recent_container}>
                                <Text style={styles.statistic_recent_title}>Dépenses récentes sur mon compte</Text>
                                <BarChart
                                    style={styles.statistic_recent}
                                    data={{
                                        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                                        datasets: [{
                                            data: [
                                                allTransactionsDays.find(trans => trans.day === 'lun.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'mar.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'mer.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'jeu.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'ven.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'sam.')!.sum,
                                                allTransactionsDays.find(trans => trans.day === 'dim.')!.sum,
                                            ],
                                        }]
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
                }

                {/* historique card */}
                {/* <HistoriqueCard screenName={screenName} style={styles.historique_card} /> */}

                {/* statistique globale année */}
                {(loadingTransactionYear || allTransactionsYear === null) ?
                    <View style={{ minHeight: 210, marginVertical: 15, padding: 10, }}>
                        <Loading style_text_container={{ color: colors.white }} />
                    </View> :
                    errorTransactionYear ? <ErrorServer height={200} message={`Une erreur est survenue lors de la récupération des transactions de l'année.\nVeuillez actualiser l'écran en le tirant vers le bas.`} /> :
                        allTransactionsYear.length === 0 ? <NoElement height={200} message={`Aucune transaction n'a été effectuée cette année.`} /> :
                            <View style={styles.statistic_global_container}>
                                <Text style={styles.statistic_global_title}>Historique Globale</Text>
                                <LineChart
                                    style={styles.statistic_global}
                                    data={{
                                        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                                        datasets: [{
                                            data: [
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Janvier')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Février')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Mars')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Avril')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Mai')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Juin')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Juillet')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Août')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Septembre')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Octobre')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Novembre')!.sum,
                                                allTransactionsYear[0].months.find(trans => trans.month === 'Décembre')!.sum,
                                            ],
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
                }
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