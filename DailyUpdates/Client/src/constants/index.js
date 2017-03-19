// debug
export const DEBUG = process.env.NODE_ENV === 'development'

// API
export const HOME_BASE = location.protocol + '//' + location.host
export const API_V1_BASE = HOME_BASE + '/api/v1'
export const USERS_API = API_V1_BASE + '/users'
export const PROJECTS_API = API_V1_BASE + '/projects'
export const TASKS_API = API_V1_BASE + '/tasks'
export const RECORDS_API = API_V1_BASE + '/records'

// current user
export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS'
export const GET_CURRENT_USER_FAIL = 'GET_CURRENT_USER_FAIL'

// projects
export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL'

export const CREATE_PROJECT = 'CREATE_PROJECT'
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
export const CREATE_PROJECT_FAIL = 'CREATE_PROJECT_FAIL'

// tasks
export const GET_TOP_TASKS = 'GET_TOP_TASKS'
export const GET_TOP_TASKS_SUCCESS = 'GET_TOP_TASKS_SUCCESS'
export const GET_TOP_TASKS_FAIL = 'GET_TOP_TASKS_FAIL'

export const GET_TASKS = 'GET_TASKS'
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const GET_TASKS_FAIL = 'GET_TASKS_FAIL'

export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_FAIL = 'CREATE_TASK_FAIL'

// records
export const GET_MY_RECORDS_TODAY = 'GET_MY_RECORDS_TODAY'
export const GET_MY_RECORDS_TODAY_SUCCESS = 'GET_MY_RECORDS_TODAY_SUCCESS'
export const GET_MY_RECORDS_TODAY_FAIL = 'GET_MY_RECORDS_TODAY_FAIL'

export const CREATE_RECORD = 'CREATE_RECORD'
export const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS'
export const CREATE_RECORD_FAIL = 'CREATE_RECORD_FAIL'
