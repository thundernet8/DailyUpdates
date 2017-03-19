import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { meReducer }                                      from './me'
import { projectsReducer }                                from './projects'
import { topTasksReducer, tasksReducer }                  from './tasks'

export default combineReducers({
    routing: routerReducer,
    me: meReducer,
    projects: projectsReducer,
    topTasks: topTasksReducer,
    tasks: tasksReducer
})
