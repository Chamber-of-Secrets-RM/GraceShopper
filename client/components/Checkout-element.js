import React from 'react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

function handleSubmit(orderId, chairId) {
  event.preventDefault()
  this.props.deleteItem(orderId, chairId)
}
export default function CheckoutElement(props) {
  const {product} = props
  console.log('PROPS IN CHECKOUT ELEMENT', props)
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
        <div>Qty:{product.quantity}</div>
        <button
          onClick={() =>
            handleSubmit(this.props.order.id, this.props.singleProduct.id)
          }
        >
          Remove from cart
        </button>
        <div>Price:{product.price * product.quantity}</div>
      </div>
    </div>
  )
}
