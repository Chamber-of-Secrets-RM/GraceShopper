import React from 'react'
import {connect} from 'react-redux'
import ProductElement from './ProductElement'

/**
 * COMPONENT
 */

class UserOrderHistory extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {}
  //Pagination Handler

  render() {
    console.log('IN RENDER OF USERORDER HISTORY', this.props)
    return (
      <div>
        {this.props.orderHistory.map(val => {
          return (
            <div>
              <p>
                You bought {val.quantity} chairs for a total of {val.itemTotal}
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
    orderHistory: state.orderHistory
  }
}

export default connect(mapState, null)(UserOrderHistory)
