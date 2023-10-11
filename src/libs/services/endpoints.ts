import AsyncStorage from '@react-native-async-storage/async-storage'

export const get_credentials = async (type: string) => {
    const t = await AsyncStorage.getItem('credentials')
    if (t) {
        const cred = JSON.parse(t)
        const accessToken = cred.accessToken
        const expiresIn = cred.expiresIn
        const usr = cred.usr

        if (type === 'accessToken') return accessToken;
        else if (type === 'expiresIn') parseInt(expiresIn);
        else if (type === 'usr') return usr;
    }
}

//----------- endpoints
const _API_BASE = 'http://192.168.50.82:8000/api/v1'

export const _end_point = {
    api_img: 'http://192.168.50.82:9000',
    customer: {
        // without id
        login: `${_API_BASE}/customers/login`,
        register: `${_API_BASE}/customers/register`,
        forgot: `${_API_BASE}/customers/forgot`,
        verify: `${_API_BASE}/customers/verify-code`,
        reset: `${_API_BASE}/customers/reset-password`,
        find: `${_API_BASE}/customers`,

        // for localisation
        localisation: `${_API_BASE}/customers/localisation`,

        // with id
        show: `${_API_BASE}/customers/`,
        update: `${_API_BASE}/customers/`,
        remove: `${_API_BASE}/customers/`,
        get_qr_code: `${_API_BASE}/customers/qr-code`,   //get 
        scanner_traitement: `${_API_BASE}/customers/scanner-traitement`, //post
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

        show: `${_API_BASE}/tarifs/:id`,            //get
        update: `${_API_BASE}/tarifs/:id`,          //put
        delete: `${_API_BASE}/tarifs/:id`,          //delete
    }
}
