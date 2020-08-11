import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from '@emotion/styled'

/**
 * COMPONENT
 */

class Navbar extends Component {
  render() {
    const NavBarBody = styled.div`
      background-color: blue;
      box-shadow: 5px 10px;
      border-radius: 4px;
      display: flex;
      height: 3rem;
      align-items: center;
    `
    const LoginDiv = styled.div`
      width: 100%;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    `
    const LoginLinks = styled.div`
      width: 100%;
      border-radius: 4px;
      display: flex;
      justify-content: flex-end;
      margin-right: 3rem;
    `
    const PageLinks = styled.div`
      width: 100%;
      border-radius: 4px;
      display: flex;
      margin-left: 3rem;
    `
    return (
      <NavBarBody>
        {this.props.isLoggedIn ? (
          <PageLinks>
            {/* The navbar will show these links after you log in */}
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
            {this.props.isAdmin ? (
              <Link className="nav-link" to="/salesGraph">
                Analytics
              </Link>
            ) : null}
            <a href="#" onClick={this.props.handleClick}>
              Logout
            </a>
          </PageLinks>
        ) : (
          <LoginDiv>
            <PageLinks>
              <Link className="nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </PageLinks>

            {/* The navbar will show these links before you log in */}
            <LoginLinks>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </LoginLinks>
          </LoginDiv>
        )}
      </NavBarBody>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
//   isAdmin: PropTypes.bool.isRequired
// }
