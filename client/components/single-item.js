/* eslint-disable complexity */
/* eslint-disable max-statements */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postToOrder, putToOrder} from '../store/order'
import {fetchSingleProduct, changeProduct} from '../store/single-product'
import {deleteItem, deleteProduct} from '../store/products'
import history from '../history'
/**
 * COMPONENT
 */

class SingleItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      putPrice: 1,
      putDescription: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePut = this.handlePut.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
      history.push('/shop')
    }
  }
  handlePut(event) {
    event.preventDefault()
    const newChair = {
      id: this.props.singleProduct.id,
      price: this.state.putPrice,
      description: this.state.putDescription
    }
    console.log('🧐this is the handlePut', newChair)
    this.props.changeProduct(newChair)
  }
  handleDelete(event) {
    event.preventDefault()
    const chair = {
      id: this.props.singleProduct.id
    }
    this.props.deleteItem(chair)
  }
  render() {
    const {singleProduct} = this.props
    console.log('singleProduct render:', singleProduct)
    if (singleProduct && singleProduct.id && !this.props.user.user.isAdmin) {
      return (
        <div className="single-product-view">
          <h1>{singleProduct.name}</h1>
          <div>
            <img src={singleProduct.imageUrl} />
          </div>
          <div>Price: ${singleProduct.price}</div>
          <div>Tags:{singleProduct.tags.map(tag => tag.name).join(', ')}</div>
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
            <button link="/shop" type="submit">
              Add to cart
            </button>
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
          <button type="button" onClick={this.handleDelete}>
            Remove item from Database
          </button>
          <form onSubmit={this.handlePut}>
            <input
              name="putPrice"
              type="float"
              min="0"
              value={this.state.putPrice}
              onChange={this.handleChange}
            />
            <button type="submit">Change Price in Database</button>
          </form>
          <form onSubmit={this.handlePut}>
            <input
              name="putDescription"
              type="text"
              value={this.state.putDescription}
              onChange={this.handleChange}
            />
            <button type="submit">Change Description in Database</button>
          </form>
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
    fetchSingleProduct: chairId => dispatch(fetchSingleProduct(chairId)),
    changeProduct: chair => dispatch(changeProduct(chair)),
    deleteItem: chair => dispatch(deleteItem(chair))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
