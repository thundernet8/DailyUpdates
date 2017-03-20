import { connect }                  from 'react-redux'
import EditActionPage               from '../components/editAction'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      myAction: state.myAction,
      projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: (id) => {
          return Promise.all(
              [dispatch(Actions.getMyAction(id)), dispatch(Actions.getAllProjects())]
          )
      },
      onUpdateAction: (id, data) => {
          return dispatch(Actions.updateAction(id, data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(EditActionPage)
