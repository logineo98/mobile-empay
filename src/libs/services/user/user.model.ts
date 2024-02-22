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

// export type userModel = {
//     id?: string
//     phone?: string
//     name?: string
//     firstname?: string
//     address?: string
//     code?: string
//     email?: string
//     account?: string
//     profil?: any
//     document?: any
//     photo?: any
//     password?: string
//     confirm?: string
//     birthday?: string
//     signature?: any
//     totalAmount?: number
//     AmountToExchange?: number
//     coordinates?: COORDINATE_TYPE
//     isChecked?: boolean
//     notificationToken?: string
//     // age?: Date

//     residenceCountry?: string  //added
//     nationality?: string //added
//     placeOfBirth?: string //added
//     city?: string //added
//     nameOnCard?: string //added
//     currentActivity?: string //added
//     fieldOfActivity?: string //added

//     documentInfos?: {
//         documentNumber?: string //added
//         documentDeliveryDate?: string //added
//         documentExpirationDate?: string //added
//         documentLicensingAuthority?: string //added
//     }

//     emergencyContact?: userEmergencyContact
// }

// export type userEmergencyContact = {
//     name?: string; //added
//     firstname?: string; //added
//     address?: string; //added
//     phone?: string; //added
//     email?: string; //added
//     relationship?: string; //added
// }

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
    transactionType: 'crediter' | 'debiter'
}