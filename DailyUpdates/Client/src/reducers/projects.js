import * as CONSTANTS     from '../constants'

export const projectsReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_PROJECTS_SUCCESS:
            return action.projects
        case CONSTANTS.GET_PROJECTS_FAIL:
            return []
        default:
            return state
    }
}
