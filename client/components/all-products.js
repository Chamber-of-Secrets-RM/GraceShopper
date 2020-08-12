import React from 'react'
import {connect} from 'react-redux'
import ProductElement from './ProductElement'
import {fetchProducts} from '../store/products'
import {fetchTags} from '../store/tags'
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
      chairsPerPage: 15,
      //filter products
      tagId: 'null'
    }
    this.handlePage = this.handlePage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getChairs()
    this.props.fetchTags()
  }
  //Pagination Handler
  handlePage(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {products} = this.props
    let filteredProducts = []
    //Filter products if set
    const {tagId} = this.state
    if (tagId !== 'null') {
      filteredProducts = products.filter(product => {
        //Check the tags array on product instance
        for (let i = 0; i < product.tags.length; i++) {
          //tagId is being assigned to a string value from handleChange
          if (parseInt(tagId) === product.tags[i].id) return true
        }
        return false
      })
    } else {
      filteredProducts = products
    }
    //Pagination indexes
    const {currentPage, chairsPerPage} = this.state
    const indexEndOfPage = currentPage * chairsPerPage
    const indexStartOfPage = indexEndOfPage - chairsPerPage
    const currentPageChairs = filteredProducts.slice(
      indexStartOfPage,
      indexEndOfPage
    )

    return (
      <div>
        <div>
          <select name="tagId" value={this.filter} onChange={this.handleChange}>
            <option value="null">-Select a category-</option>
            {this.props.tags.map(tag => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <Pagination
          postsPerPage={chairsPerPage}
          totalPosts={filteredProducts.length}
          handlePage={this.handlePage}
        />
        <div className="product-container">
          {filteredProducts.length === 0 ? (
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
    products: state.products,
    tags: state.tags
  }
}

const mapDispatch = dispatch => {
  return {
    getChairs: () => dispatch(fetchProducts()),
    fetchTags: () => dispatch(fetchTags())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
