import React from 'react'
import {connect} from 'react-redux'
import ProductElement from './ProductElement'
import {fetchProducts} from '../store/products'
import Pagination from './Pagination'

/**
 * COMPONENT
 */

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      //FrontEnd Pagination
      currentPage: 1,
      chairsPerPage: 15
    }
    this.handlePage = this.handlePage.bind(this)
  }

  componentDidMount() {
    this.props.getChairs()
  }
  //Pagination Handler
  handlePage(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const {products} = this.props
    //Pagination indexes
    const {currentPage, chairsPerPage} = this.state
    const indexEndOfPage = currentPage * chairsPerPage
    const indexStartOfPage = indexEndOfPage - chairsPerPage
    const currentPageChairs = products.slice(indexStartOfPage, indexEndOfPage)

    return (
      <div>
        <Pagination
          postsPerPage={chairsPerPage}
          totalPosts={products.length}
          handlePage={this.handlePage}
        />
        <div className="product-container">
          {products.length === 0 ? (
            <div>No available Products</div>
          ) : (
            currentPageChairs.map(chair => {
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
