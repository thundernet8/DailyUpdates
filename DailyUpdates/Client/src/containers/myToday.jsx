import { connect }                  from 'react-redux'
import MyTodayPage                  from '../components/myToday'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me,
      myRecords: state.myRecords,
      myActions: state.myActions,
      tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onPrepareData: () => {
          return Promise.all(
              [dispatch(Actions.getMyRecordsToday()), dispatch(Actions.getTasks()), dispatch(Actions.getMyActions())]
          )
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MyTodayPage)
