import { ERROR_SETTING, GET_ALL_SETTINGS, LOADING_SETTING, RESET_SETTING } from './setting.constant'
import { INITIAL_SETTING_STATE_TYPE } from './setting.model'

const initialState: INITIAL_SETTING_STATE_TYPE = {
    setting: null,
    allSettings: [],
    loadingSetting: false,
    error: false,
}

interface IAction { type: string, payload: any }

const settingReducer = (state = initialState, action: IAction): INITIAL_SETTING_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case LOADING_SETTING:
            return { ...state, loadingSetting: true }

        case ERROR_SETTING:
            return { ...state, error: payload, loadingSetting: false, allSettings: {} as any }

        case GET_ALL_SETTINGS:
            return { ...state, allSettings: payload, loadingSetting: false, error: false }

        default: return state
    }
}

export default settingReducer