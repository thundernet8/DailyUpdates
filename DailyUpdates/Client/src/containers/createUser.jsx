import { connect }                  from 'react-redux'
import CreateUserPage               from '../components/createUser'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
      me: state.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onCreateUser: (data) => {
          return dispatch(Actions.createUser(data))
      }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage)
