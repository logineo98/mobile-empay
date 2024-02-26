export type PARTNER_TYPE = {
    id?: string
    name: string
    description: string
    logo: string
}

export type INITIAL_PARTNER_STATE_TYPE = {
    partner: PARTNER_TYPE | null
    allPartners: Array<PARTNER_TYPE> | null
    loadingPartner: boolean
    error: any
}