import React from 'react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

function onSubmit() {
  event.preventDefault()
  this.props.deleteItem(this.props.order.id, this.props.singleProduct.id)
}
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
        {/* <button onClick={}>Remove from cart</button> */}
        <div>Price:{product.price * product.quantity}</div>
      </div>
    </div>
  )
}
