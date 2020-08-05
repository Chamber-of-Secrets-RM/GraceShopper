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
    console.log('event target:', event.target)
    this.props.addToCart(1, this.props.singleProduct, this.state.quantity)
  }
  render() {
    const {singleProduct} = this.props
    console.log('props:', this.props)

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
              value={this.quantity}
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
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: (orderId, product, quantity) =>
      dispatch(postToOrder(orderId, product, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
