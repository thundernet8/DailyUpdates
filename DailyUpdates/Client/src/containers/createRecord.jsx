import { connect }                  from 'react-redux'
import CreateRecordPage             from '../components/createRecord'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCreateRecord: (data) => {
          return dispatch(Actions.createRecord(data))
      },
      onGetTasks: () => {
          return dispatch(Actions.getTasks())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecordPage)
