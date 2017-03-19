import { connect }                  from 'react-redux'
import CreateTaskPage               from '../components/createTask'
import Actions                      from '../actions'
import Promise                      from 'bluebird'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      projects: state.projects,
      topTasks: state.topTasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: () => {
          return Promise.all(
              [dispatch(Actions.getAllProjects()), dispatch(Actions.getTopTasks())]
          )
      },
      onCreateTaskField: (data) => {
          return dispatch(Actions.createTask(data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskPage)
