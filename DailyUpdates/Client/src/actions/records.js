import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getMyRecordsToday = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_MY_RECORDS_TODAY
        })

        const api = CONSTANTS.RECORDS_API + '/me/today'
        return axios.get(api)
            .then((ret) => {
                console.log(ret)
                dispatch({
                    type: CONSTANTS.GET_MY_RECORDS_TODAY_SUCCESS,
                    myRecords: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                console.dir(err)
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_MY_RECORDS_TODAY_FAIL,
                    err: error
                })

                throw error
            })
    }
}

export const createRecord = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.CREATE_RECORD
        })

        const api = CONSTANTS.RECORDS_API

        return axios.post(api, data)
            .then((ret) => {
                console.log(ret)
                dispatch({
                    type: CONSTANTS.CREATE_RECORD_SUCCESS,
                    record: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                console.dir(err)
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.CREATE_RECORD_FAIL,
                    err: error
                })

                throw error
            })
    }
}
