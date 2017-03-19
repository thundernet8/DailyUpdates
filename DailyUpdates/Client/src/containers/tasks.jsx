import { connect }                  from 'react-redux'
import TasksPage                    from '../components/tasks'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      topTasks: state.topTasks,
      projects: state.projects,
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: () => {
          return Promise.all(
              [dispatch(Actions.getAllProjects()), dispatch(Actions.getTopTasks())]
          )
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(TasksPage)
