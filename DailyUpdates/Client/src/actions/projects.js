import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getAllProjects = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_PROJECTS
        })

        const api = CONSTANTS.PROJECTS_API
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_PROJECTS_SUCCESS,
                    projects: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_PROJECTS_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const createProject = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.CREATE_PROJECT
        })

        const api = CONSTANTS.PROJECTS_API

        return axios.post(api, data)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.CREATE_PROJECT_SUCCESS,
                    project: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.CREATE_PROJECT_FAIL,
                    err: error
                })

                throw error
            })
    }
}
