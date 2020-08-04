import React from 'react'
import {connect} from 'react-redux'
import ProductElement from './ProductElement'

/**
 * COMPONENT
 */

class AllProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    //add to redux store
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
  return {}
}

export default connect(mapState, null)(AllProducts)
