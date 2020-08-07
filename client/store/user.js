import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_AND_CART = 'GET_USER_AND_CART'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER = 'GET_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const getUserAndCart = (user, cart) => {
  let userInfo = {
    user: user,
    cart: cart
  }
  return {
    type: GET_USER_AND_CART,
    userInfo: userInfo
  }
}
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const getEmptyCartAndUser = data => async dispatch => {
  try {
    console.log('What is data $#%#$%#$%#$^#$^#$&#$&', data)
    let cart = await axios.get(`/api/order/user/${data.id}`)
    console.log('what is cart', cart)
    dispatch(getUserAndCart(data, cart))
  } catch (err) {
    console.log('error in getting empty cart')
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    console.log(method)
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    // return dispatch(getUser({error: authError}))
    console.log('ERROR IN AUTH')
  }

  try {
    dispatch(getEmptyCartAndUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  cart: {}
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user, cart: {}}
    case GET_USER_AND_CART:
      return {
        ...state,
        user: action.userInfo.user,
        cart: action.userInfo.cart.data
      }
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
