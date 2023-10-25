import { Alert, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import 'react-native-gesture-handler'
import Store from './src/libs/services/store'
import RootNavigation from './src/libs/navigations/root_navigation'
import { requestUserPermission } from './src/libs/constants/utils'
import { receiveScanNotification } from './src/libs/services/user/user.action'

const App = () => {

  useEffect(() => {
    requestUserPermission()

    const unsubscribe = messaging().onMessage(remoteMessage => {
      const notif: any = remoteMessage.notification
      const usr: any = JSON.parse(remoteMessage.data?.usr as string)

      console.log('usr', usr)
      console.log('notif', notif)

      if (notif?.title === 'Demande de retrait') {
        console.log('title', notif?.title);
        Store.dispatch<any>(receiveScanNotification(usr))
      } else console.log('non')

      Alert.alert(notif?.title || "Notifications", notif?.body, [{ text: "D'accord" }])
    })

    PushNotification.configure({
      onNotification: function (notification) {
        const msg = notification?.message?.toString();
        msg !== undefined && Alert.alert("Notifications", msg, [{ text: "D'accord" }])
      },
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const notifs = remoteMessage.notification;

      // Show a local notification
      PushNotification.localNotification({
        title: notifs?.title || 'Notification Title',
        message: notifs?.body || 'Notification Body',
      })
    })

    return unsubscribe
  }, [])


  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})