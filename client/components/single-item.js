/* eslint-disable complexity */
/* eslint-disable max-statements */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postToOrder, putToOrder} from '../store/order'
import {fetchSingleProduct} from '../store/single-product'
import Axios from 'axios'
/**
 * COMPONENT
 */

class SingleItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }
  componentDidMount() {
    const chairId = this.props.match.params.chairId
    this.props.fetchSingleProduct(chairId)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    // if the object is empty we know that we are a guest user
    console.log('this.props.user.user', this.props.user.user)

    if (this.props.user.user.email) {
      // new check to see if REAL user
      let duplicateCheck = false
      for (let i = 0; i < this.props.order.length; i++) {
        let curr = this.props.order[i]
        console.log('matching curr id', curr.id)
        console.log('matching singleProduct id', this.props.singleProduct.id)
        if (curr.id === this.props.singleProduct.id) {
          duplicateCheck = true
        }
      }
      if (!duplicateCheck) {
        this.props.postToOrder(
          this.props.singleProduct.id,
          this.props.user.user.id,
          this.state.quantity
        )
      } else {
        this.props.putToOrder(
          this.props.singleProduct.id,
          this.props.user.user.id,
          this.state.quantity
        )
      }
    } else {
      let newItem = {
        quantity: +this.state.quantity,
        itemTotal: this.props.singleProduct.price * this.state.quantity,
        chairId: this.props.singleProduct.id
      }

      let currentGuestOrder = localStorage.getItem('guestOrder')

      // this block is for the case where nothing is in local storage yet
      if (!currentGuestOrder) {
        let newGuestOrder = []

        newGuestOrder.push(newItem)
        let stringifiedOrder = JSON.stringify(newGuestOrder)
        localStorage.setItem('guestOrder', stringifiedOrder)
      } else if (currentGuestOrder) {
        let destringifiedOrder = JSON.parse(currentGuestOrder)

        // we need to check if newItem exists in destringifiedOrder
        // if it does: change the quantity
        // if not: push the item

        let foundDuplicate = false
        for (let orderItem of destringifiedOrder) {
          if (orderItem.chairId === newItem.chairId) {
            orderItem.quantity += +newItem.quantity
            orderItem.itemTotal +=
              newItem.quantity * this.props.singleProduct.price
            foundDuplicate = true
          }
        }
        if (!foundDuplicate) {
          destringifiedOrder.push(newItem)
        }
        let stringifiedOrder = JSON.stringify(destringifiedOrder)
        localStorage.setItem('guestOrder', stringifiedOrder)
      }
    }
  }
  async deleteItem(itemId) {
    await Axios.delete(`/api/chair/${itemId}`)
  }
  render() {
    const {singleProduct} = this.props

    if (
      singleProduct &&
      singleProduct.id &&
      this.props.user.user.isAdmin === false
    ) {
      return (
        <div className="single-product-view">
          <h1>{singleProduct.name}</h1>
          <div>
            <img src={singleProduct.imageUrl} />
          </div>
          <div>Price: ${singleProduct.price}</div>
          <h1>
            <small>Description:</small>
          </h1>
          <p>{singleProduct.description}</p>
          <form onSubmit={this.handleSubmit}>
            <input
              name="quantity"
              type="number"
              min="1"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button type="submit">Add to cart</button>
          </form>
        </div>
      )
    } else if (
      singleProduct &&
      singleProduct.id &&
      this.props.user.user.isAdmin === true
    ) {
      return (
        <div className="single-product-view">
          <h1>Admin view</h1>
          <h1>{singleProduct.name}</h1>
          <div>
            <img src={singleProduct.imageUrl} />
          </div>
          <div>Price: ${singleProduct.price}</div>
          <h1>
            <small>Description:</small>
          </h1>
          <p>{singleProduct.description}</p>
          <form onSubmit={this.handleSubmit}>
            <input
              name="quantity"
              type="number"
              min="1"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button type="submit">Add to cart</button>
          </form>
          <button
            type="submit"
            onClick={() => this.deleteItem(singleProduct.id)}
          >
            Remove item from Database
          </button>
        </div>
      )
    } else {
      return <div>Could not find product</div>
    }
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    postToOrder: (orderId, product, quantity) =>
      dispatch(postToOrder(orderId, product, quantity)),
    putToOrder: (orderId, product, quantity) =>
      dispatch(putToOrder(orderId, product, quantity)),
    fetchSingleProduct: chairId => dispatch(fetchSingleProduct(chairId))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
