import axios from 'axios'

/**
 * Action Types
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
/**
 * Action Creators
 */
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

/**
 * Thunk Creators
 */

export function fetchProducts() {
  console.log('im in fetchProducts')
  return async function(dispatch) {
    try {
      const {data: products} = await axios.get('/api/chair')
      dispatch(setProducts(products))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */

const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
