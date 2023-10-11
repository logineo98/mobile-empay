export type TARIF_TYPE = {
    id?: string,
    tarif: string,
    description: string
}

export type INITIAL_TARIF_STATE_TYPE = {
    tarif: null | TARIF_TYPE
    allTarifs: Array<TARIF_TYPE>
    loadingTarif: boolean
    error: any
}