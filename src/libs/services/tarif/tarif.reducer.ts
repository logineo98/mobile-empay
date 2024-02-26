import { ERROR_TARIF, GET_ALL_TARIFS, LOADING_TARIF, RESET_TARIF } from './tarif.constant'
import { INITIAL_TARIF_STATE_TYPE } from './tarif.model'

interface IAction { type: string, payload: any }

const initialState: INITIAL_TARIF_STATE_TYPE = {
    tarif: null,
    allTarifs: null,
    loadingTarif: false,
    error: false,
}

const tarifReducer = (state = initialState, action: IAction): INITIAL_TARIF_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_TARIF:
            return { ...state, loadingTarif: true }

        case ERROR_TARIF:
            return { ...state, error: payload, loadingTarif: false, allTarifs: {} as any }

        case GET_ALL_TARIFS:
            return { ...state, allTarifs: payload, loadingTarif: false, error: false, }

        case RESET_TARIF:
            return { ...state, allTarifs: null, }

        default: return state
    }
}

export default tarifReducer