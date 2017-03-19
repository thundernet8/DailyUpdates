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

export const tasksReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TASKS_SUCCESS:
            return action.tasks
        case CONSTANTS.GET_TASKS_FAIL:
            return []
        default:
            return state
    }
}
