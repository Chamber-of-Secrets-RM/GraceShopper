import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {timeParse} from 'd3-time-format'
import {convertTime} from './helperFunctions'

/**
 * COMPONENT
 */

class UserOrderHistory extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getChairs()
  }
  //Pagination Handler

  render() {
    console.log('IN RENDER OF USERORDER HISTORY', this.props)
    if (this.props.products.length == 0) {
      return <div> You have no bought anythign yet</div>
    }
    return (
      <div>
        {this.props.orderHistory.map(val => {
          return (
            <div>
              <p>
                You bought {val.quantity}{' '}
                {this.props.products[val.chairId].name} chair(z) for a total of
                $ {val.itemTotal} dollars
              </p>
              <p>Date of purchase: {convertTime(val.updatedAt)}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.orderHistory,
    products: state.products
  }
}
const mapDispatch = dispatch => {
  return {
    getChairs: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(UserOrderHistory)
