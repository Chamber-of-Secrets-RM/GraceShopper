import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckoutElement from './Checkout-element'

import {deleteItem, clearOrder, fetchOrder} from '../store/order'

import {fetchProducts} from '../store/products'
import {binarySearch} from './helperFunctions'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class ShoppingCart extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    console.log('inside shoppingCar CDM', this.props)
    // don't think we need this
    if (this.props.loggedOut) {
      this.props.clearOrder()
    } else {
      console.log('IS THIS RUNNING WHEN I LOG OUT?!?!?!??')
      this.props.fetchOrder(this.props.user.id)
    }
    this.props.fetchProducts()
  }
  handleSubmit(user, userId, comparableChairId) {
    // needs to be the tested: correct parameter?
    event.preventDefault()
    console.log('INSIDE OF REMOVE FROM CART BUTTON, WHAT IOS USER', user)
    if (!user) {
      // guest user block
      let currentGuestOrder = JSON.parse(localStorage.getItem('guestOrder'))
      // console.log('currentGuestOrder', currentGuestOrder)
      currentGuestOrder = currentGuestOrder.filter(chair => {
        // console.log('COMPARING BETWEEN', comparableChairId, chair.chairId)
        return comparableChairId !== chair.chairId
      })
      let stringifiedOrder = JSON.stringify(currentGuestOrder)
      localStorage.setItem('guestOrder', stringifiedOrder)
      // console.log('ABOUT TO SET STATE HERE', this.state)
      this.setState(state => {
        return {quantity: state.quantity + 1}
      })
    } else {
      //logged in user block
      // console.log('WE DONT WANT TO MAKE IT IN HERE!!!!!!!!!!!!!!')
      this.props.deleteItem(userId, comparableChairId)
    }
  } // end of handleSubmit
  render() {
    if (this.props.products.length === 0) {
      return <div />
    }
    //These are not real products
    console.log('this.props!!!!!!!!!!!!!!!!!!!!', this.props)
    // if this object is empty we know we are a guest
    if (Object.keys(this.props.cartInfo).length === 0) {
      let guestOrder = JSON.parse(localStorage.getItem('guestOrder'))
      console.log(guestOrder)
      if (!guestOrder) {
        return <div>go buy some items</div>
      } else {
        // user previously had items in local storage
        return (
          <div className="checkout-container">
            {guestOrder.map(product => {
              console.log('WHAT IS OUR INDEX', product.chairId)
              // instead of indexing by Id, we need to find the right id in table
              let index = binarySearch(this.props.products, product.chairId)
              console.log('INDEX FROM OUR BINARY SEARCH IS', index)
              let imageUrl = this.props.products[index]
              // instead search through products to find chairId Index
              console.log('WHAT IS imageUIRL INSIDE OF SHOPPING CART', imageUrl)
              let name = this.props.products[index]
              return (
                <CheckoutElement
                  key={product.chairId}
                  product={product}
                  deleteItem={this.props.deleteItem}
                  handleSubmit={this.handleSubmit}
                  imageUrl={imageUrl.imageUrl}
                  name={name.name}
                />
              )
            })}

            <Link to="/checkout">
              <button type="button">Checkout</button>
            </Link>
          </div>
        )
      }
    }
    if (this.props.cartInfo) {
      console.log('AM I MAKING IT HERE?!?!?!?!??!?!?!?')
      return (
        <div className="checkout-container">
          {this.props.cartInfo.map(product => (
            <CheckoutElement
              key={product.id}
              product={product}
              deleteItem={this.props.deleteItem}
              user={this.props.user}
              handleSubmit={this.handleSubmit}
            />
          ))}

          <div>
            Total: ${this.props.cartInfo.reduce((accumulator, chair) => {
              return (accumulator += chair.price * chair.ordersChairs.quantity)
            }, 0)}
          </div>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>

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
    cartInfo: state.order,
    products: state.products,
    loggedOut: state.user.loggedOut
  }
}
const mapDispatch = dispatch => {
  return {
    clearOrder: () => dispatch(clearOrder()),
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    deleteItem: (orderId, productId) =>
      dispatch(deleteItem(orderId, productId)),
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default connect(mapState, mapDispatch)(ShoppingCart)
