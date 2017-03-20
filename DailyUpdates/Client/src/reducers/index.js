import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { meReducer }                                      from './me'
import { projectsReducer }                                from './projects'
import { topTasksReducer, tasksReducer }                  from './tasks'
import { myRecordsTodayReducer, myRecordReducer }         from './records'
import { activitiesReducer }                              from './activities'
import { usersReducer, createdUserReducer }               from './users'

export default combineReducers({
    routing: routerReducer,
    me: meReducer,
    projects: projectsReducer,
    topTasks: topTasksReducer,
    tasks: tasksReducer,
    myRecords: myRecordsTodayReducer,
    myRecord: myRecordReducer,
    activities: activitiesReducer,
    users: usersReducer,
    createdUser: createdUserReducer
})
