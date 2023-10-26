export type COORDINATE_TYPE = {
    la: string
    lo: string
}

export type STATUS_TYPE = {
    id?: string
    la: string
    lo: string
    AmountToExchange: string
    disable?: boolean
}

export type userModel = {
    id?: string
    phone?: string
    name?: string
    firstname?: string
    address?: string
    code?: string
    email?: string
    account?: string
    profil?: any
    document?: any
    password?: string
    confirm?: string
    birthday?: string
    signature?: any
    totalAmount?: number
    AmountToExchange?: number
    coordinates?: COORDINATE_TYPE
    isChecked?: boolean
    notificationToken?: string
    age?: Date
}

export type userStore = {
    user_loading: boolean
    user_errors: string | any
    user?: userModel | null
    allUsers?: userModel[]
    host?: userModel | null
    user_tmp?: boolean
    user_log_tmp?: boolean
    user_info?: string | null
    user_data?: any
    qr_code?: string
    scan_response?: string
    scan_response_status?: boolean
    recharge_response?: string
}

export type scanModel = {
    beneficiareID: string
    titulaireID: string
    titulairePhone: string
    montantBeneficiaire: string
}

export type RECHARGE_TYPE = {
    customerId: string
    amount: number
    phone: string
}