import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'
import {binarySearch} from './helperFunctions'
import {postToOrder, putToOrder} from '../store/order'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  async componentDidUpdate() {
    if (this.state.quantity === 1) {
      this.setState({quantity: this.state.quantity + 1})
      await this.props.fetchOrder(this.props.user.id)
    }

    let currentGuestOrder = localStorage.getItem('guestOrder')
    let destringifiedOrder = JSON.parse(currentGuestOrder)

    if (!this.props.order.length) {
      //debugging
    } else if (destringifiedOrder) {
      for (let i of destringifiedOrder) {
        if (binarySearch(this.props.order, i.chairId) != -1) {
          // found in our previous order, do a put
          this.props.putToOrder(i.chairId, this.props.user.id, i.quantity)
        } else {
          this.props.postToOrder(i.chairId, this.props.user.id, i.quantity)
        }
      } // for loop
      localStorage.clear()
      console.log('local storage cleared')
    } //else if loop
  }

  render() {
    return (
      <div>
        <h3>Chamber of Furniture</h3>
        <h3>
          <small>About Us:</small>
        </h3>
        <p>Yo yo yo, ma dawg.</p>
        <p>quantity is {this.state.quantity}</p>
        <button onClick={() => this.handleClick()}>
          increment quantity of state
        </button>
        {this.props.user ? <p>logged in</p> : <p>not logged in</p>}
        {this.props.order ? (
          <p>{this.props.order.length}</p>
        ) : (
          <p>nothing in order</p>
        )}
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
    user: state.user.user,
    order: state.order
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    postToOrder: (orderId, product, quantity) =>
      dispatch(postToOrder(orderId, product, quantity)),
    putToOrder: (orderId, product, quantity) =>
      dispatch(putToOrder(orderId, product, quantity))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
