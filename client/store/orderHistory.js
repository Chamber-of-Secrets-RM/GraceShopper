import axios from 'axios'

/**
 * Action Type
 */

const SET_PURCHASES_FOR_ADMIN = 'SET_PURCHASES'
const SET_PURCHASES_FOR_USER = 'SET_PURCHASES_FOR_USER'

/**
 * Action Creators
 */
export const setPurchasesForUser = purchases => ({
  type: SET_PURCHASES_FOR_USER,
  purchases
})
export const setPurchasesForAdmin = purchases => ({
  type: SET_PURCHASES_FOR_ADMIN,
  purchases
})
export function fetchUserSpecificPurchases(userId) {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/order/user/${userId}/History`)
      console.log('FETCHING ALL PURCHASES USER SPECIFIC INSIDE THUNK', data)
      dispatch(setPurchasesForUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export function fetchAllPurchases() {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/order/fulfilledOrders`)
      console.log('FETCHING ALL PURCHASES INSIDE THUNK', data)
      dispatch(setPurchasesForAdmin(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function orderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PURCHASES_FOR_ADMIN: {
      return action.purchases
    }
    case SET_PURCHASES_FOR_USER: {
      console.log('inside of set purchases for user action')
      return action.purchases
    }
    default:
      return state
  }
}
