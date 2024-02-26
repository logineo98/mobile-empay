export type TARIF_TYPE = {
    id?: string
    tarif: string
    description: string
}

export type INITIAL_TARIF_STATE_TYPE = {
    tarif: TARIF_TYPE | null
    allTarifs: Array<TARIF_TYPE> | null
    loadingTarif: boolean
    error: boolean
}