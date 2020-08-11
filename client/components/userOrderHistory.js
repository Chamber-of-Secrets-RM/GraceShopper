import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

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
                You bought {val.quantity} amount of{' '}
                {this.props.products[val.chairId].name} chairs for a total of{' '}
                {val.itemTotal}
              </p>
              <p>Date of purchase {val.updatedAt}</p>
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
