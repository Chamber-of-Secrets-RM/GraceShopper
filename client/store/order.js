import axios from 'axios'

/**
 * Action Type
 */
const SET_ORDER = 'SET_ORDER'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const ADD_TO_ORDER = 'ADD_TO_ORDER'
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
export const addToOrder = (product, quantity) => {
  product.quantity = quantity
  return {
    type: ADD_TO_ORDER,
    product
  }
}

/**
 * Thunk Creators
 */

export function fetchOrder(userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/order/user/${userId}`)
      console.log('@#$@#$#@%#@%@#%@#^#@^@#^#@^@#^&', data.chairs)
      dispatch(setOrder(data.chairs))
    } catch (err) {
      console.error(err)
    }
  }
}
export function deleteItem(orderId, productId) {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/order/${orderId}/chair/${productId}`)
      dispatch(removeItem(productId))
    } catch (err) {
      console.error(err)
    }
  }
}
export function changeQuantity(orderId, productId, quantity) {
  return async function(dispatch) {
    try {
      await axios.put(`/api/order/${orderId}/chair/${productId}`, {
        quantity: quantity
      })
      dispatch(updateQuantity(productId, quantity))
    } catch (err) {
      console.error(err)
    }
  }
}
export function postToOrder(orderId, product, quantity) {
  return async function(dispatch) {
    try {
      // await axios.post(`/api/order/${orderId}/chair/${product.id}`,{
      //   quantity: quantity
      // })
      dispatch(addToOrder(product, quantity))
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
    case SET_ORDER: {
      console.log('inside of set order action')
      return action.order
    }

    case REMOVE_ITEM:
      return state.order.filter(product => product.id !== action.productId)
    case UPDATE_QUANTITY:
      return state.order.map(product => {
        if (product.id === action.productId) {
          product.quantity = action.quantity
        }
        return product
      })
    case ADD_TO_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}
