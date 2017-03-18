import { connect }                  from 'react-redux'
import App                          from '../components/app'
import Actions                      from '../actions'
import '../styles/global/global.scss'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetCurrentUser: () => {
          dispatch(Actions.getCurrentUser())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(App)
