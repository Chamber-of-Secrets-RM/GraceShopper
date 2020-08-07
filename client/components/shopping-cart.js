import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckoutElement from './Checkout-element'
import {fetchOrder} from '../store/order'
import {deleteItem} from '../store/order'

/**
 * COMPONENT
 */

class ShoppingCart extends Component {
  async componentDidMount() {
    console.log('inside shoppingCar CDM', this.props)
    this.props.fetchOrder(this.props.user.id)
  }
  render() {
    //These are not real products
    console.log('this.props:', this.props)

    if (this.props.cartInfo) {
      return (
        <div className="checkout-container">
          {this.props.cartInfo.map(product => (
            <CheckoutElement key={product.id} product={product} />
          ))}
          {/* <div>Total: ${placeholder}</div> */}
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
    user: state.user.user,
    cartInfo: state.order
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    deleteItem: (orderId, productId) => dispatch(deleteItem(orderId, productId))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
