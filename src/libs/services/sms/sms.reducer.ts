import { ERROR_SMS, GET_ALL_SMS, LOADING_SMS } from './sms.constant'
import { INITIAL_SMS_STATE_TYPE } from './sms.model'

interface IAction { type: string, payload: any }

const initialState: INITIAL_SMS_STATE_TYPE = {
    sms: null,
    allSms: [],
    loadingSms: false,
    errorSms: false,
}

const smsReducer = (state = initialState, action: IAction): INITIAL_SMS_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_SMS:
            return { ...state, loadingSms: true }

        case ERROR_SMS:
            return { ...state, errorSms: payload, loadingSms: false }

        case GET_ALL_SMS:
            return { ...state, allSms: payload, loadingSms: false, errorSms: false }

        default: return state
    }
}

export default smsReducer