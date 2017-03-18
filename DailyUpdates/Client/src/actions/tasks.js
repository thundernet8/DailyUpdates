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
                console.log(ret)
                dispatch({
                    type: CONSTANTS.GET_TOP_TASKS_SUCCESS,
                    topTasks: ret.data
                })

                return ret.data
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: CONSTANTS.GET_TOP_TASKS_FAIL,
                    err
                })

                throw new Error(err)
            })
    }
}

// export const createTask = (data) => {
//     return (dispatch) => {
//         dispatch({
//             type: CONSTANTS.CREATE_PROJECT
//         })

//         const api = CONSTANTS.PROJECTS_API
//         return axios.post(api, data)
//             .then((ret) => {
//                 console.log(ret)
//                 dispatch({
//                     type: CONSTANTS.CREATE_PROJECT_SUCCESS,
//                     project: ret.data
//                 })

//                 return ret.data
//             })
//             .catch((err) => {
//                 console.log(err)
//                 dispatch({
//                     type: CONSTANTS.CREATE_PROJECT_FAIL,
//                     err
//                 })

//                 throw new Error(err)
//             })
//     }
// }
