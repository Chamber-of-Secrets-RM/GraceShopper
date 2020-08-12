import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'
import {fetchProducts} from '../store/products'

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
    if (this.props.user.email) {
      await setFulfilled(this.props.user.id, this.props.cart.id)
      await this.props.fetchOrder(this.props.user.id)
      //toast
    }
  }
  render() {
    let guestOrder = JSON.parse(localStorage.getItem('guestOrder'))

    console.log('GUEST ORDER on billing Form', guestOrder)
    console.log('props', this.props)
    return (
      <div>
        <div className="billingForm">
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

          <button
            type="button"
            onCLick={e => {
              this.handleSubmit()
            }}
          >
            Submit
          </button>
        </div>
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
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default connect(mapState, mapDispatch)(BillingForm)
