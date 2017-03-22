import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getTopTasks = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_TOP_TASKS
        })

        const api = CONSTANTS.TASKS_API + '/top'
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_TOP_TASKS_SUCCESS,
                    topTasks: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_TOP_TASKS_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const getTasks = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_TASKS
        })

        const api = CONSTANTS.TASKS_API
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_TASKS_SUCCESS,
                    tasks: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_TASKS_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const getTask = (id) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_TASK
        })

        const api = CONSTANTS.TASKS_API + '/' + id
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_TASK_SUCCESS,
                    task: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_TASK_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const createTask = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.CREATE_TASK
        })

        const api = CONSTANTS.TASKS_API
        return axios.post(api, data)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.CREATE_TASK_SUCCESS,
                    task: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.CREATE_TASK_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const updateTask = (id, data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.UPDATE_TASK
        })

        const api = CONSTANTS.TASKS_API + '/' + id
        return axios.put(api, data)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.UPDATE_TASK_SUCCESS,
                    task: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.UPDATE_TASK_FAIL,
                    err: error
                })

                throw error
            })
    }
}
