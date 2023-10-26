import { ERROR_PARTNER, GET_ALL_PARTNERS, GET_ALL_PARTNERS_WITHOUT_LOADING, LOADING_PARTNER } from './partner.constant'
import { INITIAL_PARTNER_STATE_TYPE } from './partner.model'

const initialState: INITIAL_PARTNER_STATE_TYPE = {
    partner: null,
    allPartners: [],
    loadingPartner: false,
    error: null
}

interface IAction { type: string, payload: any }

const partnerReducer = (state = initialState, action: IAction): INITIAL_PARTNER_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_PARTNER:
            return { ...state, loadingPartner: true }

        case ERROR_PARTNER:
            return { ...state, error: payload, loadingPartner: false }

        case GET_ALL_PARTNERS:
            return { ...state, allPartners: payload, loadingPartner: false, error: null }

        case GET_ALL_PARTNERS_WITHOUT_LOADING:
            return { ...state, allPartners: payload, loadingPartner: false, error: null }

        default: return state
    }
}

export default partnerReducer