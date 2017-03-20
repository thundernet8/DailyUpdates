import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_ALL_USERS
        })

        const api = CONSTANTS.USERS_API
        return axios.get(api)
            .then((ret) => {
                console.log(ret)
                dispatch({
                    type: CONSTANTS.GET_ALL_USERS_SUCCESS,
                    users: ret.data
                })
            })
            .catch((err) => {
                console.dir(err)
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_ALL_USERS_FAIL,
                    err: error
                })
                throw error
            })
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.CREATE_USER
        })

        const api = CONSTANTS.USERS_API
        return axios.post(api, data)
            .then((ret) => {
                console.log(ret)
                dispatch({
                    type: CONSTANTS.CREATE_USER_SUCCESS,
                    user: ret.data
                })
            })
            .catch((err) => {
                console.dir(err)
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.CREATE_USER_FAIL,
                    err: error
                })
                throw error
            })
    }
}
