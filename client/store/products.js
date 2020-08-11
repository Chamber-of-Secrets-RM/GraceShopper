import axios from 'axios'

/**
 * Action Types
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
/**
 * Action Creators
 */
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const deleteProduct = chairId => ({
  type: DELETE_PRODUCT,
  chairId
})
/**
 * Thunk Creators
 */
export function deleteItem(chairId) {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/chair/${chairId}`, chairId)
      dispatch(deleteProduct(chairId))
    } catch (err) {
      console.error(err)
    }
  }
}

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
    case DELETE_PRODUCT:
      return [...state].filter(chair => chair.id !== action.id)
    default:
      return state
  }
}
