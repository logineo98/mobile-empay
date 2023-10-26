import axios from 'axios'
import { _end_point, get_credentials } from '../endpoints'
import { ERROR_TARIF, GET_ALL_TARIFS, GET_ALL_TARIFS_WHITHOUT_LOADING, LOADING_TARIF } from './tarif.constant'
import { debug } from '../../constants/utils'

const loadingTarif = () => (dispatch: any) => {
    dispatch({ type: LOADING_TARIF })
}

const errorTarif = (payload: any) => (dispatch: any) => {
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
        dispatch(errorTarif(error?.response?.data))
    }
}

export const getAllTarifsWithoutLoading = () => async (dispatch: any) => {
    try {

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.tarif.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_TARIFS_WHITHOUT_LOADING, payload: response.data })
    } catch (error: any) {
        debug('GET ALL TARIFS WITHOUT LOADING', error?.response?.data || error.message)
        dispatch(errorTarif(error?.response?.data))
    }
}