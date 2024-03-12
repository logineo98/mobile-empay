import axios from 'axios'
import { ERROR_SETTING, GET_ALL_SETTINGS, LOADING_SETTING, RESET_SETTING } from './setting.constant'
import { _end_point, get_credentials } from '../endpoints'
import { debug } from '../../constants/utils'

const loadingSetting = () => (dispatch: any) => {
    dispatch({ type: LOADING_SETTING })
}

const errorSetting = (payload: boolean) => (dispatch: any) => {
    dispatch({ type: ERROR_SETTING, payload })
}

export const getAllSettings = () => async (dispatch: any) => {
    try {
        dispatch(loadingSetting())

        let accessToken = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.setting.find}`, { headers: { Authorization: `Bearer ${accessToken}` } })

        dispatch({ type: GET_ALL_SETTINGS, payload: response.data })
    } catch (error: any) {
        debug('GET ALL SETTINGS', error?.response?.data || error.message)
        dispatch(errorSetting(true))
    }
}

export const resetSetting = () => async (dispatch: any) => {
    try {
        dispatch({ type: RESET_SETTING })
    } catch (error: any) {
        debug('RESET SETTING', error?.response?.data || error.message)
    }
}