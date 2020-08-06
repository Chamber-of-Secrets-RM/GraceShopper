import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postToOrder} from '../store/order'
/**
 * COMPONENT
 */

class SingleItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()

    // if (!this.props.order) {}

    // FIRST PARAMETER IS THE ORDER ID
    this.props.postToOrder(
      this.props.singleProduct,
      this.props.user.user.id,
      this.state.quantity
    )
  }
  render() {
    const {singleProduct} = this.props

    if (singleProduct && singleProduct.id) {
      return (
        <div className="single-product-view">
          <h1>{singleProduct.name}</h1>
          <div>
            <img src={singleProduct.imageUrl} />
          </div>
          <div>Price: {singleProduct.price}</div>
          <h1>
            <small>Description:</small>
          </h1>
          <p>{singleProduct.description}</p>
          <form onSubmit={this.handleSubmit}>
            <input
              name="quantity"
              type="number"
              min="0"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button type="submit">Add to cart</button>
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
      dispatch(postToOrder(orderId, product, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
