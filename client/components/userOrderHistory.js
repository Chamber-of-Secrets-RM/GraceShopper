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
    return (
      <div>
        {this.props.orderHistory.map(val => {
          return <p>{val.id}</p>
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
