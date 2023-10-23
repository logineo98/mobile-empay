import { ERROR_TARIF, GET_ALL_TARIFS, GET_ALL_TARIFS_WHITHOUT_LOADING, LOADING_TARIF } from './tarif.constant'
import { INITIAL_TARIF_STATE_TYPE } from './tarif.model'

interface IAction { type: string, payload: any }

const initialState: INITIAL_TARIF_STATE_TYPE = {
    tarif: null,
    allTarifs: [],
    loadingTarif: false,
    error: null
}

const tarifReducer = (state = initialState, action: IAction): INITIAL_TARIF_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_TARIF:
            return { ...state, loadingTarif: true }

        case ERROR_TARIF:
            return { ...state, error: payload, loadingTarif: false }

        case GET_ALL_TARIFS:
            return { ...state, allTarifs: payload, loadingTarif: false, error: null }

        case GET_ALL_TARIFS_WHITHOUT_LOADING:
            return { ...state, allTarifs: payload, loadingTarif: false, error: null }

        default: return state
    }
}

export default tarifReducer