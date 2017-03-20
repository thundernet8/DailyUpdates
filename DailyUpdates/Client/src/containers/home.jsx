import { connect }                  from 'react-redux'
import HomePage                     from '../components/home'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      activities: state.activities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetTodayActivities: () => {
          return dispatch(Actions.getTodayActivities())
      },
      onGetActivitiesOfDate: (year, month, day) => {
          return dispatch(Actions.getActivitiesOfDate(year, month, day))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
