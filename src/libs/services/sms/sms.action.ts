// my importations
import { _end_point } from '../endpoints'
import { ERROR_SMS, GET_ALL_SMS, LOADING_SMS, } from './sms.constant'
import { debug } from '../../constants/utils'
import { SMS_TYPE } from './sms.model'

const loadingSms = () => (dispatch: any) => {
    dispatch({ type: LOADING_SMS })
}

const errorSms = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_SMS, payload })
}

export const getAllSms = (data: SMS_TYPE[]) => async (dispatch: any) => {
    try {
        dispatch(loadingSms())

        await new Promise(resolve => setTimeout(resolve, 1500))

        dispatch({ type: GET_ALL_SMS, payload: data })
    } catch (error: any) {
        debug('GET ALL SMS', error?.response?.data || error.message)
        dispatch(errorSms(error?.response?.data))
    }
}