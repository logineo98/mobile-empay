import { Alert, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import 'react-native-gesture-handler'
// my importations
import Store from './src/libs/services/store'
import RootNavigation from './src/libs/navigations/root_navigation'
import { requestUserPermission } from './src/libs/constants/utils'
import { receiveRechargeNotificationCanceled, receiveRechargeNotificationSuccess, receiveScanNotification } from './src/libs/services/user/user.action'

const App = () => {

  useEffect(() => {
    requestUserPermission()

    const unsubscribe = messaging().onMessage(remoteMessage => {
      let usr
      let recharge_status
      const notif: any = remoteMessage?.notification
      if (remoteMessage?.data?.usr) usr = JSON.parse(remoteMessage?.data?.usr as string)
      if (remoteMessage?.data?.recharge) recharge_status = JSON.parse(remoteMessage?.data?.recharge as string)
      console.log(usr)
      if (notif?.title === 'Demande de retrait') Store.dispatch<any>(receiveScanNotification(usr))
      if (notif?.title === 'Paiement reussi') Store.dispatch<any>(receiveRechargeNotificationSuccess(usr, recharge_status))
      if (notif?.title === 'Paiement échoué') Store.dispatch<any>(receiveRechargeNotificationCanceled(recharge_status))

      Alert.alert(notif?.title || "Notifications", notif?.body, [{ text: "D'accord" }])
    })

    PushNotification.configure({
      onNotification: function (notification) {
        const msg = notification?.message?.toString();
        msg !== undefined && Alert.alert("Notifications", msg, [{ text: "D'accord" }])
      },
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let usr
      let recharge_status
      const notif: any = remoteMessage?.notification
      if (remoteMessage?.data?.usr) usr = JSON.parse(remoteMessage?.data?.usr as string)
      if (remoteMessage?.data?.recharge) recharge_status = JSON.parse(remoteMessage?.data?.recharge as string)

      if (notif?.title === 'Demande de retrait') Store.dispatch<any>(receiveScanNotification(usr))
      if (notif?.title === 'Paiement reussi') Store.dispatch<any>(receiveRechargeNotificationSuccess(usr, recharge_status))
      if (notif?.title === 'Paiement échoué') Store.dispatch<any>(receiveRechargeNotificationCanceled(recharge_status))

      // Show a local notification
      PushNotification.localNotification({
        title: notif?.title || 'Notification Title',
        message: notif?.body || 'Notification Body',
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