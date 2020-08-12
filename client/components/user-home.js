import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'
import {
  fetchAllPurchases,
  fetchUserSpecificPurchases
} from '../store/orderHistory'
import {binarySearch} from './helperFunctions'
import {postToOrder, putToOrder, clearOrder} from '../store/order'
import {fetchProducts} from '../store/products'
import ProductElement from './ProductElement'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      isAdminChecked: false
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  async componentDidUpdate() {
    if (this.state.quantity === 1) {
      this.setState({quantity: this.state.quantity + 1})

      await this.props.fetchOrder(this.props.user.id)

      if (this.props.isAdmin) {
        await this.props.fetchAllPurchases()
      } else {
        await this.props.fetchUserSpecificPurchases(this.props.user.id)
      }
    }

    let currentGuestOrder = localStorage.getItem('guestOrder')
    let destringifiedOrder = JSON.parse(currentGuestOrder)

    if (!this.props.user.email) {
      console.log('THIS USER IS A GUEST DONT DO DATABASE STUFF')
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
    const {products} = this.props
    //Displaying 4 random products to be featured
    const array = [
      products[Math.floor(products.length * Math.random())],
      products[Math.floor(products.length * Math.random())],
      products[Math.floor(products.length * Math.random())],
      products[Math.floor(products.length * Math.random())]
    ]
    console.log('should have numvers', array)
    return (
      <div>
        <h3>Chamber of Furniture</h3>
        <h3>
          <small>Featured Items:</small>
          <div className="product-container-feature">
            {array[0] === undefined ? (
              <div>No available Products</div>
            ) : (
              array.map(chair => {
                return <ProductElement key={chair.id} product={chair} />
              })
            )}
          </div>
        </h3>
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
    order: state.order,
    isAdmin: state.user.isAdmin,
    products: state.products
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(fetchOrder(userId)),
    fetchAllPurchases: () => dispatch(fetchAllPurchases()),
    fetchUserSpecificPurchases: userId =>
      dispatch(fetchUserSpecificPurchases(userId)),
    postToOrder: (orderId, product, quantity) =>
      dispatch(postToOrder(orderId, product, quantity)),
    putToOrder: (orderId, product, quantity) =>
      dispatch(putToOrder(orderId, product, quantity)),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
