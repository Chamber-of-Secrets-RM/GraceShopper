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
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log('state is', this.state.quantity)
    this.setState({quantity: this.state.quantity + 1})
  }
  componentDidMount() {
    console.log('inside userHome CDM', this.props)

    // this happens everytime a guest logs in, but it is safe to assume that
    // if a guest logins in and there is something in local storage, we should go ahead
    // and add what is in local storage to the users previous order
    // we can loop through our local storage and do adds
    // we wil have to do another duplicate check as well
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("inside should update old props",this.props)
  //   console.log("inside should update new", nextProps)
  //   return this.props!= nextProps
  // }
  async componentDidUpdate(prevProps) {
    console.log('FETCHED ORDER IN CDM OF HOMEPAGE', this.props)
    if (this.state.quantity === 1) {
      this.setState({quantity: this.state.quantity + 1})
      await this.props.fetchOrder(this.props.user.id)
    }

    if (prevProps.order !== this.props.order) {
      console.log('I AM SEEING ORDER CHANGE IN PROPS YAY')
    }
    let currentGuestOrder = localStorage.getItem('guestOrder')
    let destringifiedOrder = JSON.parse(currentGuestOrder)
    console.log('WHAT IS MY CURRENT GUEST ORDER', destringifiedOrder)
    if (this.props.user.email) {
      //debugging
    } else if (destringifiedOrder) {
      for (let i of destringifiedOrder) {
        console.log('POSTING AND PUTTING PUTTING AND POSTING', i)
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
    console.log('AFTER COMPONENT DID MOUNT', this.props)
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
