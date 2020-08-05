import axios from 'axios'

/**
 * Action Types
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
/**
 * Action Creators
 */
export const setProducts = singleProduct => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct
})

/**
 * Thunk Creators
 */

export function fetchSingleProduct(productId) {
  return async function(dispatch) {
    try {
      // const {data: singleProduct} = await axios.get(`/api/chair/${productId}`)
      // dispatch(setProducts(singleProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */

const initialState = {
  id: 1,
  name: 'Red Chair',
  price: 99
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
