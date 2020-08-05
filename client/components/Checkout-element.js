import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export default function CheckoutElement(props) {
  const {product} = props
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
        <button>Remove from cart</button>
        <div>Price:{product.price * product.quantity}</div>
      </div>
    </div>
  )
}
