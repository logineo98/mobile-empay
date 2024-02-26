import axios from 'axios'
import { ERROR_HISTORY, ERROR_TRANSACTION_DAY, ERROR_TRANSACTION_YEAR, GET_ALL_HISTORYS, GET_TRANSACTIONS_DAYS, GET_TRANSACTIONS_YEAR, LOADING_HISTORY, LOADING_TRANSACTION_DAY, LOADING_TRANSACTION_YEAR, RESET_HISTORY, RESET_HISTORY_SEM_YEAR } from './history.constant'
import { _end_point, get_credentials } from '../endpoints'
import { debug } from '../../constants/utils'

const loadingHistory = () => (dispatch: any) => {
    dispatch({ type: LOADING_HISTORY })
}

const loadingTransactionDay = () => (dispatch: any) => {
    dispatch({ type: LOADING_TRANSACTION_DAY })
}

const loadingTransactionYear = () => (dispatch: any) => {
    dispatch({ type: LOADING_TRANSACTION_YEAR })
}

const errorHistory = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_HISTORY, payload })
}

const errorTransactionDay = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_TRANSACTION_DAY, payload })
}

const errorTransactionYear = (payload: any) => (dispatch: any) => {
    dispatch({ type: ERROR_TRANSACTION_YEAR, payload })
}

export const getAllHistorys = (id: string) => async (dispatch: any) => {
    try {
        dispatch(loadingHistory())

        let accessToken = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.history.find}/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })

        dispatch({ type: GET_ALL_HISTORYS, payload: response.data })
    } catch (error: any) {
        debug('GET ALL HISTORYS', error?.response?.data || error.message)
        dispatch(errorHistory(true))
    }
}

export const getTransactionsDays = (id: string) => async (dispatch: any) => {
    try {
        dispatch(loadingTransactionDay())

        let accessToken = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.history.transaction_days_states}/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })

        dispatch({ type: GET_TRANSACTIONS_DAYS, payload: response.data })
    } catch (error: any) {
        debug('GET TRANSACTION DAYS', error?.response?.data || error.message)
        dispatch(errorTransactionDay(true))
    }
}

export const getTransactionsYear = (id: string, year: string) => async (dispatch: any) => {
    try {
        dispatch(loadingTransactionYear())

        let accessToken = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.history.transaction_year_states}/${id}?year=${year}`, { headers: { Authorization: `Bearer ${accessToken}` } })

        dispatch({ type: GET_TRANSACTIONS_YEAR, payload: response.data })
    } catch (error: any) {
        debug('GET TRANSACTION YEAR', error?.response?.data || error.message)
        dispatch(errorTransactionYear(true))
    }
}

export const resetHistory = () => async (dispatch: any) => {
    try {
        dispatch(loadingHistory())

        dispatch({ type: RESET_HISTORY, })
    } catch (error: any) {
        debug('RESET HISTORY', error?.response?.data || error.message)
        dispatch(errorHistory(true))
    }
}

export const resetHistorySemYear = () => async (dispatch: any) => {
    try {
        dispatch({ type: RESET_HISTORY_SEM_YEAR, })
    } catch (error: any) {
        debug('RESET HISTORY SEMAINE YEAR', error?.response?.data || error.message)
    }
}