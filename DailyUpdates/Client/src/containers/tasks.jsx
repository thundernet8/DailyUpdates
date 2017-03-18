import { connect }                  from 'react-redux'
import TasksPage                    from '../components/tasks'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      topTasks: state.topTasks,
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetTopTasks: () => {
          return dispatch(Actions.getTopTasks())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(TasksPage)
