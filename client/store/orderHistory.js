import axios from 'axios'

/**
 * Action Type
 */

const SET_PURCHASES_FOR_ADMIN = 'SET_PURCHASES'

/**
 * Action Creators
 */

export const setPurchasesForAdmin = purchases => ({
  type: SET_PURCHASES_FOR_ADMIN,
  purchases
})

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
      console.log('inside of set purchases action')
      return action.purchases
    }

    default:
      return state
  }
}
