import axios from 'axios'

/**
 * Action Type
 */
const SET_ORDER = 'SET_ORDER'

/**
 * Action Creators
 */

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

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

/**
 * Reducer
 */

const initialState = []

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}
