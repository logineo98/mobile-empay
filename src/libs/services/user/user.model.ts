export type coordinateType = { la: string; lo: string }

export type statusGeoMontantType = { id?: string, la: string; lo: string; montant: string, disable?: boolean }

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
    montant?: string
    coordinates?: coordinateType,
    isChecked?: boolean,
    age?: Date
}

export type userStore = {
    user_loading: boolean
    user_errors: string | any
    user?: userModel | null
    allUsers?: userModel[]
    host?: userModel | null
    user_tmp?: boolean
    user_info?: string | null
    user_data?: any
    qr_code?: string
    scan_response?: string
    scan_response_status?: boolean
}

export type scanModel = {
    beneficiareID: string
    titulaireID: string
    titulairePhone: string
    montantBeneficiaire: string
}