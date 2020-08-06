import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h3>Chamber of Furniture</h3>
        <h3>
          <small>About Us:</small>
        </h3>
        <p>Yo yo yo, ma dawg.</p>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user.user
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
