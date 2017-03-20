import React                                                        from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect, Router } from 'react-router'
import moment                                                       from 'moment'

/* containers */
import App from './containers/app'
import HomePage from './containers/home'
import AboutPage from './containers/about'
import NotFoundPage from './components/404'
import ProjectsPage from './containers/projects'
import TasksPage from './containers/tasks'
import CreateProjectPage from './containers/createProject'
import CreateTaskPage from './containers/createTask'
import CreateRecordPage from './containers/createRecord'
import MyTodayPage from './containers/myToday'
import EditRecordPage from './containers/editRecord'
import UsersPage from './containers/users'
import CreateUserPage from './containers/createUser'
import CreateActionPage from './containers/createAction'
import EditActionPage from './containers/editAction'

const validateDateHandler = (nextState, replace, callback) => {
    const dataStr = nextState.params.year + '-' + nextState.params.month + '-' + nextState.params.day
    const valid = moment(dataStr, 'YYYY-MM-DD').isValid()
    if (!valid) {
        replace('/404')
    }
    callback()
}

const routes = (
    <Router>
        <Redirect from='/' to='/today'/>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="/today" component={HomePage}/>
            <Route path="/today" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/projects" component={ProjectsPage}/>
            <Route path="/projects/new" component={CreateProjectPage}/>
            <Route path="/tasks" component={TasksPage}/>
            <Route path="/tasks/new" component={CreateTaskPage}/>
            <Route path="/records/new" component={CreateRecordPage}/>
            <Route path="/records/edit/:id" component={EditRecordPage}/>
            <Route path="/actions/new" component={CreateActionPage}/>
            <Route path="/actions/edit/:id" component={EditActionPage}/>
            <Route path="/users" component={UsersPage}/>
            <Route path="/users/new" component={CreateUserPage}/>
            <Route path="/me/today" component={MyTodayPage}/>
            <Route path="/:year/:month/:day" component={HomePage} onEnter={validateDateHandler}/>
            <Route path="/404" component={NotFoundPage}/>
            <Redirect from='*' to='/404'/>
        </Route>
    </Router>
)

export default routes
