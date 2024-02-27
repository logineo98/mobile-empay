import axios from 'axios'
import { _end_point, get_credentials } from '../endpoints'
import { ERROR_TARIF, GET_ALL_TARIFS, LOADING_TARIF, RESET_TARIF } from './tarif.constant'
import { debug } from '../../constants/utils'

const loadingTarif = () => (dispatch: any) => {
    dispatch({ type: LOADING_TARIF })
}

const errorTarif = (payload: boolean) => (dispatch: any) => {
    dispatch({ type: ERROR_TARIF, payload })
}

export const getAllTarifs = () => async (dispatch: any) => {
    try {
        dispatch(loadingTarif())

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.tarif.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_TARIFS, payload: response.data })
    } catch (error: any) {
        debug('GET ALL TARIFS', error?.response?.data || error.message)
        dispatch(errorTarif(true))
    }
}

export const resetTarif = () => async (dispatch: any) => {
    try {
        dispatch({ type: RESET_TARIF })
    } catch (error: any) {
        debug('RESET TARIF', error?.response?.data || error.message)
    }
}