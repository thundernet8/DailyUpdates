import { connect }                  from 'react-redux'
import CreateActionPage             from '../components/createAction'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCreateAction: (data) => {
          return dispatch(Actions.createAction(data))
      },
      onGetProjects: () => {
          return dispatch(Actions.getAllProjects())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateActionPage)
