import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

class SingleItem extends Component {
  render() {
    const {singleProduct} = this.props
    console.log(singleProduct, singleProduct.id)
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
          <form>
            <input name="quantity" type="number" />
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
  return {}
}

export default connect(mapState, null)(SingleItem)
