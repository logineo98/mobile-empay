import { user_errors, user_forgot_success, get_all_users, user_loading, user_login_success, user_logout_success, user_register_success, user_reset_success, user_verify_success, user_status_geo_montant, get_qr_code, scan_qr_code, user_resent_success, recharge_compte, reset_qr_code, receive_scan_notification, receive_recharge_notification_success, receive_recharge_notification_canceled, card_losted, send_sms_list, send_sms_loading, reset_all_users, receive_card_losted_notification, get_user, actived_unactivated_location } from './user.constant';
import { userStore } from './user.model'

const initial: userStore = { verify_code: null, send_sms_loading: false, user_loading: false, user_errors: null, user: null, allUsers: null, host: null, user_tmp: false, user_log_tmp: false, user_info: null }
interface IAction { type: string; payload: string | boolean | any }

const userReducer = (state = initial, action: IAction): userStore => {
    switch (action.type) {

        case user_loading: return { ...state, user_loading: true, user_errors: false, }
        case send_sms_loading: return { ...state, send_sms_loading: true, user_errors: false, }
        case user_errors: return { ...state, user_loading: false, user_errors: action.payload, allUsers: {} as any }

        case user_reset_success:
        case user_login_success: return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, user_info: action.payload.info, user_tmp: true }

        case user_logout_success: return initial;

        case user_verify_success:
        case user_forgot_success: return { ...state, user_errors: false, user_loading: false, user_data: action.payload, user_forgot_info: action.payload.info, user_log_tmp: true }

        case user_resent_success: return { ...state, user_errors: false, user_loading: false, verify_code: action.payload, user_info: action.payload.info }

        case user_register_success: return { ...state, user_errors: false, user_loading: false, user: action.payload, user_log_tmp: true }

        case get_user:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, }

        case get_all_users:
            return { ...state, user_errors: false, user_loading: false, allUsers: action.payload, }

        case user_status_geo_montant:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, }

        case get_qr_code:
            return { ...state, user_errors: false, user_loading: false, qr_code: action.payload, }

        case reset_qr_code:
            return { ...state, user_errors: false, user_loading: false, qr_code: action.payload, }

        case scan_qr_code:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, scan_response: action.payload.info, scan_response_status: action.payload.status }

        case receive_scan_notification:
            return { ...state, user_errors: false, user_loading: false, host: action.payload, qr_code: `${action.payload.id}/${action.payload.phone}/${action.payload.AmountToExchange}` }

        case recharge_compte:
            return { ...state, user_errors: false, user_loading: false, recharge_response: action.payload }

        case receive_recharge_notification_success:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, recharge_response: action.payload.recharge_status }

        case receive_recharge_notification_canceled:
            return { ...state, user_errors: false, user_loading: false, recharge_response: action.payload }

        case card_losted:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, }

        case receive_card_losted_notification:
            return { ...state, user_errors: false, user_loading: false, host: action.payload }

        case send_sms_list:
            return { ...state, user_errors: false, send_sms_loading: false, user_loading: false, host: action.payload.usr, }

        case actived_unactivated_location:
            return { ...state, user_errors: false, user_loading: false, host: action.payload.usr, }

        case 'reset_user_tmp': return { ...state, user_tmp: false }
        case 'reset_user_log_tmp': return { ...state, user_log_tmp: false }
        case 'reset_user_info': return { ...state, user_info: null }
        case 'reset_user_forgot_info': return { ...state, user_forgot_info: null }
        case 'reset_user_data': return { ...state, user_data: null }
        case 'reset_user_errors': return { ...state, user_errors: null }
        case 'reset_user_verify_code': return { ...state, verify_code: null }

        case reset_all_users: return { ...state, allUsers: null, }

        default: return state
    }
}

export default userReducer