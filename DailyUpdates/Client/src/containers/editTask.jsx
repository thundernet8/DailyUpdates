import { connect }                  from 'react-redux'
import EditTaskPage                 from '../components/editTask'
import Actions                      from '../actions'
import Promise                      from 'bluebird'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      projects: state.projects,
      topTasks: state.topTasks,
      task: state.task
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: (id) => {
          return Promise.all(
              [dispatch(Actions.getTask(id)), dispatch(Actions.getAllProjects()), dispatch(Actions.getTopTasks())]
          )
      },
      onUpdateTaskField: (id, data) => {
          return dispatch(Actions.updateTask(id, data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskPage)
