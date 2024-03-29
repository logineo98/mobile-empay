import { ERROR_PARTNER, GET_ALL_PARTNERS, LOADING_PARTNER, RESET_PARTNER } from './partner.constant'
import { INITIAL_PARTNER_STATE_TYPE } from './partner.model'

const initialState: INITIAL_PARTNER_STATE_TYPE = {
    partner: null,
    allPartners: null,
    loadingPartner: false,
    error: false,
}

interface IAction { type: string, payload: any }

const partnerReducer = (state = initialState, action: IAction): INITIAL_PARTNER_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_PARTNER:
            return { ...state, loadingPartner: true }

        case ERROR_PARTNER:
            return { ...state, error: payload, loadingPartner: false, allPartners: {} as any }

        case GET_ALL_PARTNERS:
            return { ...state, allPartners: payload, loadingPartner: false, error: false }

        case RESET_PARTNER:
            return { ...state, allPartners: null, }

        default: return state
    }
}

export default partnerReducer