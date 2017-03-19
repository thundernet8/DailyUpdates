import * as CONSTANTS     from '../constants'

export const myRecordsTodayReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MY_RECORDS_TODAY_SUCCESS:
            return action.myRecords
        case CONSTANTS.GET_MY_RECORDS_TODAY_FAIL:
            return []
        default:
            return state
    }
}

export const myRecordReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MY_RECORD_SUCCESS:
            return action.myRecord
        default:
            return state
    }
}
