import { connect }                  from 'react-redux'
import EditRecordPage               from '../components/editRecord'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      tasks: state.tasks,
      projects: state.projects,
      myRecord: state.myRecord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: (id) => {
          return Promise.all(
              [dispatch(Actions.getMyRecord(id)), dispatch(Actions.getTasks()), dispatch(Actions.getAllProjects())]
          )
      },
      onUpdateRecord: (id, data) => {
          return dispatch(Actions.updateRecord(id, data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(EditRecordPage)
