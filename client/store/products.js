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
  },
  {
    id: 2,
    name: 'Yellow Chair',
    price: 77
  },
  {
    id: 3,
    name: 'Blue Chair',
    price: 55
  },
  {
    id: 4,
    name: 'Green Chair',
    price: 33
  },
  {
    id: 5,
    name: 'Purple Chair',
    price: 11
  }
]

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
