import { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
import WebView from 'react-native-webview'
import NetInfo, { useNetInfoInstance } from '@react-native-community/netinfo'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import Loading from '../../components/common/drawer/others/loading'
import NoConnection from '../../components/common/drawer/others/no_connection'

type COMPONENT_TYPE = { navigation: StackNavigationHelpers, screenName: string }

const Chatbot: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { netInfo: { isConnected } } = useNetInfoInstance()

    const webViewRef = useRef<any>()

    const [loading, setLoading] = useState(true)

    const onRefresh = () => {
        setLoading(true);
        isConnected && webViewRef.current.reload()
    }

    return (
        <ScreenContainer2 title='Chatbot' reload refreshing={false} onRefresh={onRefresh} navigation={navigation}>
            {isConnected === null ? <Loading /> :
                isConnected === false ? <NoConnection /> :
                    <>
                        {loading && <Loading />}

                        <View style={{ height: loading ? 0 : '100%' }}>
                            <WebView
                                ref={webViewRef}
                                source={{ uri: 'https://emploietmoi.com/chatbot' }}
                                cacheEnabled={true}
                                onLoad={() => { setLoading(false) }}
                                onError={() => { { setLoading(false) } }}
                            />
                        </View>
                    </>
            }
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({

})

export default Chatbot