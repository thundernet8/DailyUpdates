import * as CONSTANTS     from '../constants'

export const topTasksReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TOP_TASKS_SUCCESS:
            return action.topTasks
        case CONSTANTS.GET_TOP_TASKS_FAIL:
            return []
        default:
            return state
    }
}
