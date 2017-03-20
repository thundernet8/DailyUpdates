import * as CONSTANTS     from '../constants'

export const activitiesReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_ACTIVITIES_SUCCESS:
            return action.activities
        default:
            return state
    }
}
