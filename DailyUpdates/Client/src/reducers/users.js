import * as CONSTANTS     from '../constants'

export const usersReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_ALL_USERS_SUCCESS:
            return action.users
        case CONSTANTS.GET_ACTIVITIES_FAIL:
            return []
        default:
            return state
    }
}

export const createdUserReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.CREATE_USER_SUCCESS:
            return action.user
        default:
            return state
    }
}
