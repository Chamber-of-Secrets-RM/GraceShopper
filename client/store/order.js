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
export const addToOrder = productData => {
  console.log('WHAT IS PRODUCT IN ADD TO ORDER ACTION', productData)

  return {
    type: ADD_TO_ORDER,
    productData
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
export function deleteItem(userId, productId) {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/order/user/${userId}/chair/${productId}`)
      dispatch(removeItem(productId))
    } catch (err) {
      console.error(err)
    }
  }
}
// export function changeQuantity(orderId, productId, quantity) {
//   return async function (dispatch) {
//     try {
//       await axios.put(`/api/order/${orderId}/chair/${productId}`, {
//         quantity: quantity,
//       })
//       dispatch(updateQuantity(productId, quantity))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }
export function postToOrder(product, userId, quantity) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post(
        `/api/order/user/${userId}/chair/${product.id}`,
        {
          quantity: quantity
        }
      )
      dispatch(addToOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export function putToOrder(product, userId, quantity) {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(
        `/api/order/user/${userId}/chair/${product.id}`,
        {
          quantity: quantity
        }
      )
      console.log('DATA FROM PUT AXIOS', data)
      dispatch(addToOrder(data))
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
      return state.filter(product => product.id !== action.productId)

    case UPDATE_QUANTITY:
      return state.order.map(product => {
        if (product.id === action.productId) {
          product.quantity = action.quantity
        }
        return product
      })
    case ADD_TO_ORDER: {
      console.log('INSIDE ADD_TO_ORDER REDUCER', action.productData)
      let newArr = state.filter(
        product => product.id !== action.productData.chairId
      )

      console.log('NEW ARRAY INSIDE ADD_TO_ORDER', newArr)
      newArr.push(action.productData)
      return newArr
    }

    default:
      return state
  }
}
