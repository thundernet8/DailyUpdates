import React                                                from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

/* containers */
import App from './containers/app'
import HomePage from './containers/home'
import AboutPage from './containers/about'
import ProjectsPage from './containers/projects'
import TasksPage from './containers/tasks'
import CreateProjectPage from './containers/createProject'
import CreateTaskPage from './containers/CreateTask'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/" component={HomePage}/>
    {/* <Redirect from='*' to='/404'/> */}
    <Route path="/about" component={AboutPage}/>
    <Route path="/projects" component={ProjectsPage}/>
    <Route path="/projects/new" component={CreateProjectPage}/>
    <Route path="/tasks" component={TasksPage}/>
    <Route path="/tasks/new" component={CreateTaskPage}/>
  </Route>
)

export default routes
