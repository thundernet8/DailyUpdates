import { connect }                  from 'react-redux'
import CreateProjectPage            from '../components/createProject'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCreateProject: (data) => {
          return dispatch(Actions.createProject(data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage)
