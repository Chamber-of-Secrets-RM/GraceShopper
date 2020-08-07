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

    // if this object is empty we know we are a guest
    if (Object.keys(this.props.cart).length === 0) {
      let guestOrder = JSON.parse(localStorage.getItem('guestOrder'))
      console.log(guestOrder)
      if (!guestOrder) {
        return <div>go buy some items</div>
      } else {
        // user previously had items in local storage
        return (
          <div className="checkout-container">
            {guestOrder.map(product => (
              <CheckoutElement
                key={product.chairId}
                product={product}
                deleteItem={this.props.deleteItem}
              />
            ))}
            {/* <div>Total: ${placeholder}</div> */}
            <button>Checkout</button>
          </div>
        )
      }
    }
    if (this.props.cartInfo) {
      return (
        <div className="checkout-container">
          {this.props.cartInfo.map(product => (
            <CheckoutElement
              key={product.id}
              product={product}
              deleteItem={this.props.deleteItem}
              user={this.props.user}
            />
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
    cart: state.user.cart, // if empty we know we are a guest
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
