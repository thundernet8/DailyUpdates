import * as CONSTANTS     from '../constants'

export const meReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_CURRENT_USER_SUCCESS:
            return action.user
        default:
            return state
    }
}
