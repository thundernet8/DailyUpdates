import * as CONSTANTS     from '../constants'

export const myActionsReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MY_ACTIONS_SUCCESS:
            return action.myActions
        case CONSTANTS.GET_MY_ACTIONS_FAIL:
            return []
        default:
            return state
    }
}

export const openActionsReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_OPEN_ACTIONS_SUCCESS:
            return action.openActions
        case CONSTANTS.GET_OPEN_ACTIONS_FAIL:
            return []
        default:
            return state
    }
}

export const myActionReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.GET_MY_ACTION_SUCCESS:
            return action.myAction
        default:
            return state
    }
}
