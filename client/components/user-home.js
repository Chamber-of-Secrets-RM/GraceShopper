import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'
import {binarySearch} from './helperFunctions'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('inside userHome CDM', this.props)

    // this happens everytime a guest logs in, but it is safe to assume that
    // if a guest logins in and there is something in local storage, we should go ahead
    // and add what is in local storage to the users previous order
    // we can loop through our local storage and do adds
    // we wil have to do another duplicate check as well
  }
  componentDidUpdate() {
    console.log('FETCHED ORDER IN CDM OF HOMEPAGE', this.props)
    this.props.fetchOrder(this.props.user.id)

    let currentGuestOrder = localStorage.getItem('guestOrder')
    console.log('WHAT IS MY CURRENT GUEST ORDER', currentGuestOrder)
    if (!this.props.order) {
      //debugging
    } else if (currentGuestOrder) {
      console.log('COMPONENT DID UPDATE', this.props)
      for (let i of currentGuestOrder) {
        if (binarySearch(this.props.orders, i.chairId) != -1) {
          // found in our previous order, do a put
          this.props.putToOrder(i, this.props.user.user.id, i.quantity)
        } else {
          this.props.postToOrder(i, this.props.user.user.id, i.quantity)
        }
      }
    }
    localStorage.clear()
    console.log('local storage cleared')
  }

  render() {
    console.log('AFTER COMPONENT DID MOUNT', this.props)
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
    user: state.user.user,
    order: state.user.order
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
