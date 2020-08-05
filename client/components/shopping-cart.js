import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckoutElement from './Checkout-element'
import fetchOrder from '../store/order'

/**
 * COMPONENT
 */

class ShoppingCart extends Component {
  render() {
    //These are not real products
    console.log('this.props:', this.props)
    const theOrder = [
      {
        id: 1,
        name: 'Red Chair',
        price: 99,
        quantity: 2
      },
      {
        id: 2,
        name: 'Yellow Chair',
        price: 77,
        quantity: 5
      },
      {
        id: 3,
        name: 'Blue Chair',
        price: 55,
        quantity: 1
      }
    ]
    const placeholder = 200
    if (theOrder) {
      return (
        <div className="checkout-container">
          {theOrder.map(product => (
            <CheckoutElement key={product.id} product={product} />
          ))}
          <div>Total: ${placeholder}</div>
          <button>Checkout</button>
        </div>
      )
    } else {
      return <div>No items currently in cart.</div>
    }
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    loadOrder: userId => dispatch(fetchOrder(userId))
  }
}

export default connect(mapState, null)(ShoppingCart)
