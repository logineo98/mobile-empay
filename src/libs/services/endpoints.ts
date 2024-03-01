import AsyncStorage from '@react-native-async-storage/async-storage'
import { userModel } from './user/user.model'

export const get_credentials = async (type: string) => {
    const t = await AsyncStorage.getItem('credentials')
    if (t) {
        const cred = JSON.parse(t)
        const accessToken = cred.accessToken
        const expiresIn = cred.expiresIn
        const notificationToken = cred.notificationToken
        const usr = cred.usr

        if (type === 'accessToken') return accessToken;
        else if (type === 'expiresIn') return parseInt(expiresIn);
        else if (type === 'notificationToken') return notificationToken;
        else if (type === 'usr') return usr;
    }
}

export const set_credentials = async (usr: userModel, accessToken: string) => {
    let expiresIn = await get_credentials('expiresIn')
    let notificationToken = await get_credentials('notificationToken')

    await AsyncStorage.setItem('credentials', JSON.stringify({ usr, accessToken, expiresIn, notificationToken }))
}

//----------- endpoints
const _API_BASE = 'https://empay-api.appemploietmoi.com/api/v1'

export const _end_point = {
    api_img: 'https://empay-file.appemploietmoi.com',
    customer: {
        // without id
        login: `${_API_BASE}/customers/login`,
        logout: `${_API_BASE}/customers/logout`,
        register: `${_API_BASE}/customers/register`,
        forgot: `${_API_BASE}/customers/forgot`,
        verify: `${_API_BASE}/customers/verify-code`,
        reset: `${_API_BASE}/customers/reset-password`,
        find: `${_API_BASE}/customers`,

        // for localisation
        localisation: `${_API_BASE}/customers/localisation`,

        // with id
        show: `${_API_BASE}/customers`,
        update: `${_API_BASE}/customers`,
        remove: `${_API_BASE}/customers`,
        get_qr_code: `${_API_BASE}/customers/qr-code`,   //get 
        scanner_traitement: `${_API_BASE}/customers/scanner-traitement`, //post

        // for recharge
        recharge: `${_API_BASE}/recharges/customer-account`,

        // for lost card
        customerCardState: `${_API_BASE}/customers/customerCardState`, //put
    },
    partenaire: {
        register: `${_API_BASE}/partenaires/register`,  //post
        find: `${_API_BASE}/partenaires`,               //get

        show: `${_API_BASE}/partenaires`,              //get
        update: `${_API_BASE}/partenaires`,            //put
        remove: `${_API_BASE}/partenaires`,            //delete
    },
    tarif: {
        register: `${_API_BASE}/tarifs/register`,   //post
        find: `${_API_BASE}/tarifs`,                //get

        show: `${_API_BASE}/tarifs`,            //get
        update: `${_API_BASE}/tarifs`,          //put
        delete: `${_API_BASE}/tarifs`,          //delete
    },
    history: {
        find: `${_API_BASE}/transactions/history`, //get,
        transaction_days_states: `${_API_BASE}/transactions/get/days-states`, //get
        transaction_year_states: `${_API_BASE}//transactions/get/years/states`, //get
    },
    sms: {
        saveExternalTransactions: `${_API_BASE}/recharges/saveExternalTransactions` //post
    },
    setting: {
        register: `${_API_BASE}/settings/register`,   //post
        find: `${_API_BASE}/settings`,                //get

        show: `${_API_BASE}/settings`,            //get
        update: `${_API_BASE}/settings`,          //put
        delete: `${_API_BASE}/settings`,          //delete
    },
}
