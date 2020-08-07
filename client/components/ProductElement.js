import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export default function ProductElement(props) {
  const {product} = props
  return (
    <div className="product-element">
      <div>
        <Link to={`/products/${product.id}`}>
          <img className="media" src={product.imageUrl} />
        </Link>
      </div>
      <div>
        <Link to={`/products/${product.id}`}>
          <div>{product.name}</div>
        </Link>
        <div>${product.price}</div>
      </div>
    </div>
  )
}
