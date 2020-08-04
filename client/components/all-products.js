import React from 'react'
import {connect} from 'react-redux'

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
    const products = []
    return (
      <div>
        <div className="Product-container">
          {products.length === 0 ? (
            <div>No available Products</div>
          ) : (
            <div>Place holder</div>
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

export default connect(null, null)(AllProducts)
