import { connect }                  from 'react-redux'
import CreateRecordPage             from '../components/createRecord'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      tasks: state.topTasks,
      projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCreateRecord: (data) => {
          return dispatch(Actions.createRecord(data))
      },
      onPrepareData: () => {
          return Promise.all(
              [dispatch(Actions.getAllProjects()), dispatch(Actions.getTopTasks())]
          )
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecordPage)
