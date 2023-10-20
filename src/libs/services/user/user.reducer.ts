import { user_errors, user_forgot_success, get_all_users, user_loading, user_login_success, user_logout_success, user_register_success, user_reset_success, user_verify_success, user_status_geo_montant, get_qr_code, scan_qr_code, user_resent_success } from './user.constant';
import { userStore } from './user.model'

const initial: userStore = { user_loading: false, user_errors: null, user: null, allUsers: [], host: null, user_tmp: false, user_info: null }
interface IAction { type: string; payload: string | boolean | any }

const userReducer = (state = initial, action: IAction): userStore => {
    switch (action.type) {

        case user_loading: return { ...state, user_loading: true, user_errors: false, }
        case user_errors: return { ...state, user_loading: false, user_errors: action.payload, }

        case user_reset_success:
        case user_login_success: return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, user_info: action.payload.info, user_tmp: true }

        case user_logout_success: return initial;

        case user_verify_success:
        case user_forgot_success: return { ...state, user_errors: false, user_loading: false, user_data: action.payload, user_info: action.payload.info, user_tmp: true }

        case user_resent_success: return { ...state, user_errors: false, user_loading: false, user_data: action.payload, user_info: action.payload.info }

        case user_register_success: return { ...state, user_errors: false, user_loading: false, user: action.payload, user_tmp: true }

        case get_all_users:
            return { ...state, user_errors: false, user_loading: false, allUsers: action.payload, }

        case user_status_geo_montant:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, }

        case get_qr_code:
            return { ...state, user_errors: false, user_loading: false, qr_code: action.payload, }

        case scan_qr_code:
            return { ...state, user_errors: false, user_loading: false, scan_response: action.payload.info, scan_response_status: action.payload.status }

        case 'reset_user_tmp': return { ...state, user_tmp: false }
        case 'reset_user_info': return { ...state, user_info: null }
        case 'reset_user_data': return { ...state, user_data: null }
        case 'reset_user_errors': return { ...state, user_errors: null }

        default: return state
    }
}

export default userReducer