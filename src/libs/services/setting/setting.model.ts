export type SETTING_TYPE = {
    id: string
    name: string
    value: string
    createdAt: Date
    updatedAt: Date
}

export type INITIAL_SETTING_STATE_TYPE = {
    setting: null | SETTING_TYPE
    allSettings: Array<SETTING_TYPE>
    loadingSetting: boolean
    error: boolean
}