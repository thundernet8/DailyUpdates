import * as CONSTANTS                from '../constants'
import axios                         from 'axios'

export const getCurrentUser = () => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.GET_CURRENT_USER
        })

        const meApi = CONSTANTS.USERS_API + '/me'
        return axios.get(meApi)
            .then((ret) => {
                console.log(ret)
                dispatch({
                    type: CONSTANTS.GET_CURRENT_USER_SUCCESS,
                    user: ret.data
                })
            })
            .catch((err) => {
                console.dir(err)
                const error = new Error(err.response.data.error)
                dispatch({
                    type: CONSTANTS.GET_CURRENT_USER_FAIL,
                    err: error
                })
                throw error
            })
    }
}
