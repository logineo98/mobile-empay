export type PARTNER_TYPE = {
    id?: string
    name: string
    description: string
    logo: string
}

export type INITIAL_PARTNER_STATE_TYPE = {
    partner: null | PARTNER_TYPE
    allPartners: Array<PARTNER_TYPE>
    loadingPartner: boolean
    error: any
}