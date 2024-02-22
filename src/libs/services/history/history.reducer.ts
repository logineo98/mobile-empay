// my importations
import { ERROR_HISTORY, ERROR_TRANSACTION_DAY, ERROR_TRANSACTION_YEAR, GET_ALL_HISTORYS, GET_TRANSACTIONS_DAYS, GET_TRANSACTIONS_YEAR, LOADING_HISTORY, LOADING_TRANSACTION_DAY, LOADING_TRANSACTION_YEAR, RESET_HISTORY, RESET_HISTORY_SEM_YEAR } from './history.constant'
import { INITIAL_HISTORY_STATE_TYPE } from './history.model'

const initialState: INITIAL_HISTORY_STATE_TYPE = {
    history: null,
    allHistorys: null,
    allTransactionsDays: null,
    allTransactionsYear: null,
    loadingHistory: false,
    loadingTransactionDay: false,
    loadingTransactionYear: false,
    errorHistory: false,
    errorTransactionDay: false,
    errorTransactionYear: false,
}

const historyReducer = (state = initialState, action: { type: string, payload: any }): INITIAL_HISTORY_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_HISTORY:
            return { ...state, loadingHistory: true }

        case LOADING_TRANSACTION_DAY:
            return { ...state, loadingTransactionDay: true }

        case LOADING_TRANSACTION_YEAR:
            return { ...state, loadingTransactionYear: true }

        case ERROR_HISTORY:
            return { ...state, errorHistory: payload, loadingHistory: false, allHistorys: null, }

        case ERROR_TRANSACTION_DAY:
            return { ...state, errorTransactionDay: payload, loadingTransactionDay: false, allTransactionsDays: null, }

        case ERROR_TRANSACTION_YEAR:
            return { ...state, errorTransactionYear: payload, loadingTransactionYear: false, allTransactionsYear: null, }

        case GET_ALL_HISTORYS:
            return { ...state, allHistorys: payload, loadingHistory: false, errorHistory: false, }

        case GET_TRANSACTIONS_DAYS:
            return { ...state, allTransactionsDays: payload, loadingTransactionDay: false, errorTransactionDay: false, }

        case GET_TRANSACTIONS_YEAR:
            return { ...state, allTransactionsYear: payload, loadingTransactionYear: false, errorTransactionYear: false, }

        case RESET_HISTORY:
            return { ...state, allHistorys: null, }

        case RESET_HISTORY_SEM_YEAR:
            return { ...state, allTransactionsDays: null, allTransactionsYear: null, }

        default: return state
    }
}

export default historyReducer