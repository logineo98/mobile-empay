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
    id?: string;
    phone?: string;
    name?: string;
    firstname?: string;
    birthday?: string;
    email?: string;
    password?: string;
    nationality?: string //added
    placeOfBirth?: string //added
    currentActivity?: string //added
    fieldOfActivity?: string //added
    profil?: any
    photo?: string
    signature?: any;

    notificationTokens?: string[];
    refreshCode?: string;
    status?: boolean;

    //PARRAINAGE
    parrainCode?: string;
    parrain?: string;
    sponsored?: string[];

    //DOCUMENT INFORMATIONS
    document?: any;
    documentNumber?: string
    documentDeliveryDate?: string
    documentExpirationDate?: string
    documentLicensingAuthority?: string
    documentType?: string;

    //EMERGENCY CONTACT
    contactName?: string;
    contactFirstname?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactRelationship?: string;

    //UBA INFORMATIONS
    accountUBA?: string;
    totalAmount?: number;     //to remove later because it is switched by cardAmount
    AmountToExchange?: number;
    montant?: string
    account?: string


    //CREDIT CARD INFORMATIONS
    nameOnCard?: string
    cardNumber?: string
    cardExpirationDate?: string
    cardCVC?: string
    cardAmount?: number
    lostCard?: boolean;

    //ADDRESS INFORMATIONS
    residenceCountry?: string
    city?: string
    address?: string;
    coordinates?: { lat?: string, lng?: string },

    createdAt?: Date;
    updatedAt?: Date;

    notificationToken?: string, //not in database
    code?: string //not in database
    confirm?: string //not in database
    isChecked?: boolean //not in database
}

export type userStore = {
    user_loading: boolean
    send_sms_loading?: boolean
    user_errors: string | any
    user?: userModel | null
    allUsers: userModel[] | null
    host?: userModel | null
    user_tmp?: boolean
    user_log_tmp?: boolean
    user_info?: string | null
    user_forgot_info?: string | null
    user_data?: any
    verify_code?: any,
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
    transactionType: 'crediter' | 'debiter'
}
