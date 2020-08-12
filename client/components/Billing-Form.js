import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder, setFulfilled} from '../store/order'
import {fetchProducts} from '../store/products'
import {getEmptyCartAndUser} from '../store/user'

import {useToasts} from 'react-toast-notifications'

class BillingForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      cardNumber: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    console.log('inside Billing-Info CDM', this.props)
    // don't think we need this
    if (this.props.loggedOut) {
      this.props.fetchProducts()
      // this.props.clearOrder()
    } else {
      console.log('IS THIS RUNNING WHEN I LOG OUT?!?!?!??')
      this.props.fetchOrder(this.props.user.id)
    }
    // this.props.fetchProducts()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(e) {
    e.preventDefault()
    console.log('made it into handle submit')
    let data = {
      // special formatting for getEmptyCartAndUser
      id: this.props.user.id
    }
    if (this.props.user.email) {
      console.log('made it into here?!?!??!??!??!?!?!?!!?')
      await this.props.setFulfilled(this.props.user.id, this.props.cart.id)
      await this.props.fetchOrder(this.props.user.id)
      await this.props.getEmptyCartAndUser(data)
      const {addToast} = useToasts()
      addToast('Congrats on the chairs bro!', {appearance: 'success'})
      //toast
    }
  }
  render() {
    let guestOrder = JSON.parse(localStorage.getItem('guestOrder'))

    console.log('GUEST ORDER on billing Form', guestOrder)
    console.log('props', this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Address:</label>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <label>Credit Card:</label>
          <input
            name="cardNumber"
            type="text"
            placeholder="Not a real CC...SERIOUSLY"
            value={this.state.cardNumber}
            onChange={this.handleChange}
          />

          <button type="submit">Add to cart</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    cart: state.user.cart, // if empty we know we are a guest
    cartInfo: state.order,
    products: state.products,
    loggedOut: state.user.loggedOut
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    setFulfilled: (userId, orderId) => dispatch(setFulfilled(userId, orderId)),
    fetchProducts: () => dispatch(fetchProducts()),
    getEmptyCartAndUser: data => dispatch(getEmptyCartAndUser(data))
  }
}
export default connect(mapState, mapDispatch)(BillingForm)
