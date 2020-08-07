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

export function fetchSingleProduct(chairId) {
  return async function(dispatch) {
    try {
      const {data: singleProduct} = await axios.get(`/api/chair/${chairId}`)
      dispatch(setProducts(singleProduct))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */

const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
