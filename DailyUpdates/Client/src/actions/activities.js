import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getTodayActivities = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_ACTIVITIES
        })

        const api = CONSTANTS.ACTIVITIES_API + '/today'
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_ACTIVITIES_SUCCESS,
                    activities: ret.data
                })
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_ACTIVITIES_FAIL,
                    err: error
                })
                throw error
            })
    }
}

export const getActivitiesOfDate = (year, month, day) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_ACTIVITIES
        })

        const api = CONSTANTS.ACTIVITIES_API + '/' + year + '/' + month + '/' + day
        return axios.get(api)
            .then((ret) => {
                dispatch({
                    type: CONSTANTS.GET_ACTIVITIES_SUCCESS,
                    activities: ret.data
                })
            })
            .catch((err) => {
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_ACTIVITIES_FAIL,
                    err: error
                })
                throw error
            })
    }
}
