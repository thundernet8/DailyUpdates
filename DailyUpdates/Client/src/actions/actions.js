import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getOpenActions = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_OPEN_ACTIONS
        })

        const api = CONSTANTS.ACTIONS_API + '/open'
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_OPEN_ACTIONS_SUCCESS,
                    openActions: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_OPEN_ACTIONS_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const getMyActions = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_MY_ACTIONS
        })

        const api = CONSTANTS.ACTIONS_API + '/me'
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_MY_ACTIONS_SUCCESS,
                    myActions: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_MY_ACTIONS_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const createAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.CREATE_ACTION
        })

        const api = CONSTANTS.ACTIONS_API

        return axios.post(api, data)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.CREATE_RECORD_SUCCESS,
                    action: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.CREATE_ACTION_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const updateAction = (id, data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.UPDATE_ACTION
        })

        const api = CONSTANTS.ACTIONS_API + '/' + id

        return axios.put(api, data)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.UPDATE_ACTION_SUCCESS,
                    updatedAction: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.UPDATE_ACTION_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const getMyAction = (id) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_MY_ACTION
        })

        const api = CONSTANTS.ACTIONS_API + '/me/' + id

        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_MY_ACTION_SUCCESS,
                    myAction: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_MY_ACTION_FAIL,
                    err: error
                })

                throw error
            })
    }
}
