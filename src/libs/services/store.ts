import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import partnerReducer from './partner/partner.reducer'
import tarifReducer from './tarif/tarif.reducer'
import userReducer from './user/user.reducer'
import historyReducer from './history/history.reducer'
import smsReducer from './sms/sms.reducer'
import settingReducer from './setting/setting.reducer'

const reducers = combineReducers({
    partner: partnerReducer,
    tarif: tarifReducer,
    user: userReducer,
    history: historyReducer,
    sms: smsReducer,
    setting: settingReducer,
})

const Store = legacy_createStore(reducers, applyMiddleware(thunk))

export type RootState = ReturnType<typeof reducers>

export default Store

