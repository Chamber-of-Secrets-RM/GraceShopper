import React from 'react'
import {connect} from 'react-redux'
import ProductElement from './ProductElement'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */

class AllProducts extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getChairs()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <div className="product-container">
          {products.length === 0 ? (
            <div>No available Products</div>
          ) : (
            products.map(chair => {
              return <ProductElement key={chair.id} product={chair} />
            })
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getChairs: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
