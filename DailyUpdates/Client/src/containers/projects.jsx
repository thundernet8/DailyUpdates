import { connect }                  from 'react-redux'
import ProjectsPage                 from '../components/projects'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      projects: state.projects,
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetProjects: () => {
          return dispatch(Actions.getAllProjects())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
