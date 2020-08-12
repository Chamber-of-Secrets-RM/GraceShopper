import React, {Component} from 'react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

export default class CheckoutElement extends Component {
  constructor() {
    super()
  }

  render() {
    const {product, imageUrl, name} = this.props
    if (!this.props.user) {
      return (
        <div className="checkout-element">
          <div>
            <Link to={`/products/${product.chairId}`}>
              <img className="media" src={imageUrl} />
            </Link>
          </div>
          <div>
            <Link to={`/products/${product.id}`}>
              <div>{name}</div>
            </Link>
            <div>
              Qty:{product.quantity} x ${product.price}
            </div>
            <button
              onClick={() =>
                this.props.handleSubmit(this.props.user, null, product.chairId)
              }
            >
              Remove from cart
            </button>
            <div>Price: ${product.itemTotal}</div>
          </div>
        </div>
      )
    }
    if (!product.ordersChairs) {
      return <div>hello</div>
    }
    return (
      <div className="checkout-element">
        <div>
          <Link to={`/products/${product.id}`}>
            <img className="media" src={product.imageUrl} />
          </Link>
        </div>
        <div>
          <Link to={`/products/${product.id}`}>
            <div>{product.name}</div>
          </Link>
          <div>Qty:{product.ordersChairs.quantity} x $</div>
          <button
            onClick={() =>
              this.props.handleSubmit(
                this.props.user,
                this.props.user.id,
                product.id
              )
            }
          >
            Remove from cart
          </button>
          <div>Price: ${product.price * product.ordersChairs.quantity}</div>
        </div>
      </div>
    )
  }
}
