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

export function fetchSingleProduct() {
  return async function(dispatch) {
    try {
      // const {data: products} = await axios.get('/api/chair')
      // dispatch(setProducts(products))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */

const initialState = [
  {
    id: 1,
    name: 'Red Chair',
    price: 99
  }
]

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.products
    default:
      return state
  }
}
