import { connect }                  from 'react-redux'
import UsersPage                    from '../components/users'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      users: state.users,
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetUsers: () => {
          return dispatch(Actions.getAllUsers())
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
