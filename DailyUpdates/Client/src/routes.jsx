import React                                                        from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect, Router } from 'react-router'

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

const routes = (
    <Router>
        <Redirect from='/' to='/today'/>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="/today" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/projects" component={ProjectsPage}/>
            <Route path="/projects/new" component={CreateProjectPage}/>
            <Route path="/tasks" component={TasksPage}/>
            <Route path="/tasks/new" component={CreateTaskPage}/>
            <Route path="/records/new" component={CreateRecordPage}/>
            <Route path="/404" component={NotFoundPage}/>
            <Redirect from='*' to='/404'/>
        </Route>
    </Router>
)

export default routes
