import axios from 'axios'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import { RECHARGE_TYPE, scanModel, STATUS_TYPE, userModel } from './user.model'
import { _end_point, get_credentials, set_credentials } from '../endpoints'
import { card_losted, get_all_users, get_all_users_without_loading, get_qr_code, receive_recharge_notification_canceled, receive_recharge_notification_success, receive_scan_notification, recharge_compte, reset_qr_code, scan_qr_code, send_sms_list, user_errors, user_forgot_success, user_loading, user_login_success, user_logout_success, user_register_success, user_resent_success, user_reset_success, user_status_geo_montant, user_verify_success } from './user.constant'
import { Expired, debug } from '../../constants/utils'
import { connexion_request, forgot_request, reset_request, verify_request } from './user.request'


const user_error = (error: any) => (dispatch: any) => {
    if (error === "Network Error") dispatch({ type: user_errors, payload: "Erreur lors de la connexion au serveur" })
    else dispatch({ type: user_errors, payload: error })
}

export const checking = () => async (dispatch: any) => {
    dispatch({ type: 'user_loading' })

    const expiresIn = await get_credentials('expiresIn')
    let token = await get_credentials('accessToken');

    // if ((!expiresIn || expiresIn === '') && (!token || token === '')) {
    //     dispatch(logout()); return;
    // }

    if (expiresIn !== '' && token !== '') {
        if (!Expired(parseInt(expiresIn))) {
            dispatch(profile())
        } else dispatch(logout());
    }
}

const profile = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })
        const usr = await get_credentials('usr')
        // const config = { headers: { Authorization: `Bearer ${token}` } }

        dispatch({ type: user_login_success, payload: { usr } })
    } catch (err: any) {
        dispatch(logout());
    }
}

export const login = (data: userModel, setError: any) => async (dispatch: any) => {
    try {

        if (connexion_request(data, setError)) return;

        dispatch({ type: user_loading })

        const res = await axios.post(_end_point.customer.login, data)

        res.data.expiresIn = new Date().getTime() + parseInt(res.data.expiresIn)
        res.data.notificationToken = data?.notificationToken

        await AsyncStorage.setItem('credentials', JSON.stringify(res.data))

        dispatch({ type: user_login_success, payload: res.data })
    } catch (error: any) {
        debug('USER LOGIN ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const logout = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')
        let notificationToken = await get_credentials('notificationToken')

        await axios.post(_end_point.customer.logout, { notificationToken }, { headers: { Authorization: `Bearer ${token}` } })
        await AsyncStorage.removeItem('credentials')

        dispatch({ type: user_logout_success })
    } catch (error: any) {
        debug('USER LOGOUT ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const forgot_password = (data: userModel, setError: any) => async (dispatch: any) => {
    try {
        if (forgot_request(data, setError)) return;
        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.forgot, data)

        dispatch({ type: user_forgot_success, payload: res.data })
    } catch (error: any) {
        debug('USER FORGOT PASSWORD ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const forgot_verify = (data: userModel, setError: any) => async (dispatch: any) => {
    try {
        if (verify_request(data, setError)) return;

        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.verify, data)

        dispatch({ type: user_verify_success, payload: res.data })
    } catch (error: any) {
        debug('USER FORGOT CODE VERIFY ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const resent_code = (data: userModel, setError: any) => async (dispatch: any) => {
    try {
        if (forgot_request(data, setError)) return;

        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.forgot, data)

        dispatch({ type: user_resent_success, payload: res.data })
    } catch (error: any) {
        debug('USER RESENT CODE PASSWORD ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const reset_password = (data: userModel, setError: any) => async (dispatch: any) => {
    try {
        if (reset_request(data, setError)) return;

        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.reset, data)

        res.data.expiresIn = new Date().getTime() + parseInt(res.data.expiresIn)
        res.data.notificationToken = data?.notificationToken

        await AsyncStorage.setItem('credentials', JSON.stringify(res.data))

        dispatch({ type: user_reset_success, payload: res.data })
    } catch (error: any) {
        debug('USER RESET PASSWORD ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const inscription_service = (data: FormData, notificationToken: string) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')
        let expiresIn = await get_credentials('expiresIn')

        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const res = await axios.post(_end_point.customer.register, data, config)

        await AsyncStorage.setItem('credentials', JSON.stringify({ accessToken: token, expiresIn, notificationToken: notificationToken }))


        dispatch({ type: user_register_success, payload: res.data })
    } catch (error: any) {
        debug('USER REGISTER ACTION', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const getAllusers = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.customer.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: get_all_users, payload: response.data })
    } catch (error: any) {
        debug('GET ALL USERS', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const getAllusersWithoutLoading = () => async (dispatch: any) => {
    try {
        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.customer.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: get_all_users_without_loading, payload: response.data })
    } catch (error: any) {
        debug('GET ALL USERS WITHOUT LOADING', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const send_status_geo_montant = (data: STATUS_TYPE) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let accessToken = await get_credentials('accessToken')

        const response = await axios.post(`${_end_point.customer.localisation}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })

        set_credentials(response.data?.usr, accessToken)

        dispatch({ type: user_status_geo_montant, payload: { usr: response.data, } })
    } catch (error: any) {
        debug('SEND STATUS GEO MONTANT', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const getQrCode = (id: string) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.customer.get_qr_code}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: get_qr_code, payload: response.data })
    } catch (error: any) {
        debug('GET QR CODE', error?.response?.data || error.message)
        dispatch({ type: reset_qr_code, payload: 'reset' })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const resetQrCode = () => async (dispatch: any) => {
    try {
        dispatch({ type: reset_qr_code, payload: 'reset' })
    } catch (error: any) {
        debug('RESET QR CODE', error?.response?.data || error.message)
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const _scanQrCode = (data: scanModel, navigation: DrawerNavigationHelpers) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let accessToken = await get_credentials('accessToken')

        const response = await axios.post(`${_end_point.customer.scanner_traitement}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })

        set_credentials(response.data?.usr, accessToken)

        dispatch({ type: scan_qr_code, payload: response.data })

        navigation.navigate('ika_wari_taa_status', { status: response.data.status })
    } catch (error: any) {
        debug('SCAN QR CODE', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message, })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const receiveScanNotification = (usr: userModel) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')
        let expiresIn = await get_credentials('expiresIn')
        let notificationToken = await get_credentials('notificationToken')

        await AsyncStorage.setItem('credentials', JSON.stringify({ usr: usr, accessToken: token, expiresIn, notificationToken }))

        dispatch({ type: receive_scan_notification, payload: usr })
    } catch (error: any) {
        debug('RECEIVE SCAN QR CODE NOTIFICATION', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message, })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const recharge = (data: RECHARGE_TYPE) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')

        const response = await axios.post(`${_end_point.customer.recharge}`, data, { headers: { Authorization: `Bearer ${token}` } })

        await AsyncStorage.setItem('recharge_status', response.data.paymentStatus)

        dispatch({ type: recharge_compte, payload: response.data.paymentStatus })
    } catch (error: any) {
        debug('RECHARGE COMPTE', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const receiveRechargeNotificationSuccess = (usr: userModel, recharge_status: { paymentStatus: string }) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let token = await get_credentials('accessToken')
        let expiresIn = await get_credentials('expiresIn')
        let notificationToken = await get_credentials('notificationToken')

        await AsyncStorage.setItem('credentials', JSON.stringify({ usr: usr, accessToken: token, expiresIn, notificationToken }))
        await AsyncStorage.setItem('recharge_status', recharge_status.paymentStatus)

        dispatch({ type: receive_recharge_notification_success, payload: { usr, recharge_status: recharge_status.paymentStatus } })
    } catch (error: any) {
        debug('RECEIVE RECHARGE NOTIFICATION SUCCESS', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message, })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const receiveRechargeNotificationCanceled = (recharge_status: { paymentStatus: string }) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        await AsyncStorage.setItem('recharge_status', recharge_status.paymentStatus)

        dispatch({ type: receive_recharge_notification_canceled, payload: recharge_status.paymentStatus })
    } catch (error: any) {
        debug('RECEIVE RECHARGE NOTIFICATION CANCELED', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message, })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const verifyRechargeStatus = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let recharge_status = await AsyncStorage.getItem('recharge_status')

        await AsyncStorage.setItem('recharge_status', recharge_status || '')

        dispatch({ type: recharge_compte, payload: recharge_status || '' })
    } catch (error: any) {
        debug('RECHARGE COMPTE', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const _cardLosted = (
    id: string, data: { lostCard: true },
    setVisibleAskModal: (value: React.SetStateAction<boolean>) => void,
    setDisplayVisaCard: (value: React.SetStateAction<boolean>) => void
) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let accessToken = await get_credentials('accessToken')

        const response = await axios.put(`${_end_point.customer.customerCardState}/${id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })

        set_credentials(response.data?.usr, accessToken)

        setVisibleAskModal(false)
        setDisplayVisaCard(false)

        dispatch({ type: card_losted, payload: response.data })
    } catch (error: any) {
        debug('CARD LOSTED  ', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message })
        dispatch(user_error(error?.response?.data || error.message))
    }
}

export const sendSms = (data: { customerId: string, messages: string[] }, last_sms_date: string) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        let accessToken = await get_credentials('accessToken')

        const response = await axios.post(`${_end_point.sms.saveExternalTransactions}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })

        set_credentials(response.data?.usr, accessToken)

        await AsyncStorage.setItem('last_sms_date', last_sms_date)

        dispatch({ type: send_sms_list, payload: 'send' })
    } catch (error: any) {
        debug('SEND SMS', error?.response?.data || error.message)
        Toast.show({ type: 'info', text1: 'Informations', text2: error?.response?.data || error.message })
        dispatch(user_error(error?.response?.data || error.message))
    }
}