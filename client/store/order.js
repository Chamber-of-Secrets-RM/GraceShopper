import axios from 'axios'

/**
 * Action Type
 */
const SET_ORDER = 'SET_ORDER'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
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
export const updateQuantity = (productId, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    productId,
    quantity
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
export function deleteItem(orderId, productId) {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/throughTable/${orderId}/${productId}`)
      dispatch(removeItem(productId))
    } catch (err) {
      console.error(err)
    }
  }
}
export function changeQuantity(orderId, productId, quantity) {
  return async function(dispatch) {
    try {
      await axios.put(`/api/throughTable/${orderId}/${productId}`, {
        quantity: quantity
      })
      dispatch(updateQuantity(productId, quantity))
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
    case UPDATE_QUANTITY:
      return state.order.map(product => {
        if (product.id === action.productId) {
          product.quantity = action.quantity
        }
        return product
      })
    default:
      return state
  }
}
