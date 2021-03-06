import axios from 'axios'

/**
 * Action Type
 */
const SET_ORDER = 'SET_ORDER'
const CLEAR_ORDER = 'CLEAR_ORDER'
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
export const clearOrder = () => {
  console.log('WHAT IS CLEAR ORDER ACTION')

  return {
    type: CLEAR_ORDER
  }
}

/**
 * Thunk Creators
 */

export function fetchOrder(userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/order/user/${userId}`)
      if (!data.chairs) dispatch(setOrder([]))
      else {
        console.log('@#$@#$#@%#@%@#%@#^#@^@#^#@^@#^&', data.chairs)
        dispatch(setOrder(data.chairs))
      }
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
export function postToOrder(productId, userId, quantity) {
  return async function(dispatch) {
    try {
      const {data} = await axios.post(
        `/api/order/user/${userId}/chair/${productId}`,
        {
          quantity: quantity
        }
      )
      dispatch(fetchOrder(userId))
    } catch (err) {
      console.error(err)
    }
  }
}
export function putToOrder(productId, userId, quantity) {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(
        `/api/order/user/${userId}/chair/${productId}`,
        {
          quantity: quantity
        }
      )
      console.log('DATA FROM PUT AXIOS', data)
      dispatch(fetchOrder(userId))
    } catch (err) {
      console.error(err)
    }
  }
}

// fulfills a users order
export function setFulfilled(userId, orderId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(
        `/api/order/user/${userId}/setFulfilled/${orderId}`
      )
      console.log('DATA FROM PUT AXIOS', data)
      dispatch(clearOrder())
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
      return action.order
    }
    case CLEAR_ORDER: {
      return []
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
