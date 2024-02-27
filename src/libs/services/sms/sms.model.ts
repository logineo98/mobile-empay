export type SMS_TYPE = {
    _id: 1,
    address: string
    body: string
    creator: string
    date: number
    date_sent: number
    error_code: number
    locked: number
    protocol: number
    read: number
    reply_path_present: number
    seen: number
    status: number
    sub_id: number
    thread_id: number
    type: number
}

export type INITIAL_SMS_STATE_TYPE = {
    sms: null | SMS_TYPE
    allSms: Array<SMS_TYPE>
    loadingSms: boolean
    errorSms: boolean
}