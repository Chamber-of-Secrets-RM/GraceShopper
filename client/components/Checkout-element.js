import React from 'react'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

export default function CheckoutElement(props) {
  const {product} = props
  function handleSubmit(orderId, chairId) {
    event.preventDefault()
    props.deleteItem(orderId, chairId)
  }
  console.log('PROPS IN CHECKOUT ELEMENT', product.ordersChairs.quantity)
  if (!props) {
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
        <div>Qty:{product.ordersChairs.quantity}</div>
        <button onClick={() => handleSubmit(props.user.id, product.id)}>
          Remove from cart
        </button>
        <div>Price:{product.price * product.ordersChairs.quantity}</div>
      </div>
    </div>
  )
}
