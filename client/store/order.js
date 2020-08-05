import axios from 'axios'

/**
 * Action Type
 */
const SET_ORDER = 'SET_ORDER'
const REMOVE_ITEM = 'REMOVE_ITEM'
/**
 * Action Creators
 */

export const setOrder = order => ({
  type: SET_ORDER,
  order
})
export const removeItem = productId => {
  return {
    type: REMOVE_ITEM,
    productId
  }
}
/**
 * Thunk Creators
 */

export function fetchOrder(orderId) {
  return async function(dispatch) {
    try {
      const {data: order} = await axios.get(`/api/order/${orderId}`)
      dispatch(setOrder(order))
    } catch (err) {
      console.error(err)
    }
  }
}
export function deleteItem(orderId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/order/${orderId}`)
      dispatch(removeItem(data.id))
    } catch (err) {
      console.error(err)
    }
  }
}

/*
 * Reducer
 */

const initialState = []

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    case REMOVE_ITEM:
      return state.order.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
