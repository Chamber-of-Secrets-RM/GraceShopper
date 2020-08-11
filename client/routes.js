import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleItem,
  ShoppingCart
} from './components'
import LineGraph from './components/lineGraph'
import UserOrderHistory from './components/userOrderHistory'
import {me} from './store'
import {fetchOrder} from './store/order'
import BillingForm from './components/Billing-Form'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    try {
      await this.props.loadInitialData()
    } catch (err) {
      console.error(err)
    }
    console.log('routes compoenentdidmount:', this.props)
  }
  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
        <Route path="/shop" component={AllProducts} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/products/:chairId" component={SingleItem} />
        <Route path="/userOrderHistory" component={UserOrderHistory} />
        <Route path="/salesGraph" component={LineGraph} />
        <Route path="/checkout" component={BillingForm} />
        {/* <Route path="/checkout/:cartId" component={newCheckoutElm} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchOrder: userId => dispatch(fetchOrder(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
