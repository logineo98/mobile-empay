import { PARTNER_TYPE } from '../partner/partner.model'
import { userModel } from '../user/user.model'

export type RECHARGE_TYPE = {
    orderId?: string
    amount?: number
    phone?: string
    paymentStatus?: 'PENDING' | 'CANCELED' | 'SUCCESS' | 'EXTERNAL-TRANSACTION'
    transactionType?: 'debiter' | 'crediter' | 'other'
    message?: string
    cardAmount?: number

    customer?: userModel
    customerId?: string

    balance?: number //not in database

    createdAt?: Date
    updatedAt?: Date
}

export type TRANSACTION_DAY_TYPE = {
    day: 'lun.' | 'mar.' | 'mer.' | 'jeu.' | 'ven.' | 'sam.' | 'dim.'
    count: number
    sum: number
}

export type TRANSACTION_DAY_YEAR = {
    year: number
    months: {
        month: 'Janvier' | 'Février' | 'Mars' | 'Avril' | 'Mai' | 'Juin' | 'Juillet' | 'Août' | 'Septembre' | 'Octobre' | 'Novembre' | 'Décembre'
        count: number
        sum: number
    }[]
    total_count: number
    total_sum: number
}

export type HISTORY_TYPE = PARTNER_TYPE | RECHARGE_TYPE

export type INITIAL_HISTORY_STATE_TYPE = {
    history: null | HISTORY_TYPE
    allHistorys: Array<HISTORY_TYPE> | null
    allTransactionsDays: Array<TRANSACTION_DAY_TYPE> | null
    allTransactionsYear: Array<TRANSACTION_DAY_YEAR> | null
    loadingHistory: boolean
    loadingTransactionDay: boolean
    loadingTransactionYear: boolean
    errorHistory: boolean
    errorTransactionDay: boolean
    errorTransactionYear: boolean
}