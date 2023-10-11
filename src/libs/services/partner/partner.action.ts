import axios from 'axios'
import { ERROR_PARTNER, GET_ALL_PARTNERS, LOADING_PARTNER } from './partner.constant'
import { _end_point, get_credentials } from '../endpoints'
import { debug } from '../../constants/utils'

const loadingPartner = () => (dispatch: any) => {
    dispatch({ type: LOADING_PARTNER })
}

const errorPartner = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_PARTNER, payload })
}

export const getAllPartners = () => async (dispatch: any) => {
    try {
        dispatch(loadingPartner())

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.partenaire.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_PARTNERS, payload: response.data })
    } catch (error: any) {
        debug('GET ALL PARTNERS', error?.response?.data || error.message)
        dispatch(errorPartner(error?.response?.data))
    }
}