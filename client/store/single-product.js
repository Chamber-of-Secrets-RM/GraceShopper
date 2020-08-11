import axios from 'axios'

/**
 * Action Types
 */
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * Action Creators
 */
export const setProducts = singleProduct => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct
})
export const updateProduct = singleProduct => ({
  type: UPDATE_PRODUCT,
  singleProduct
})
/**
 * Thunk Creators
 //  */
// export function deleteItem(itemId) {
//   return async function (dispatch) {
//     try {
//       const {data} = await axios.delete(`/api/chair/${itemId}`)

//     }

//   }
// }
export function changeProduct(chair) {
  return async function(dispatch) {
    await axios.put(`/api/chair/${chair.id}`, chair)
    dispatch(updateProduct(chair))
  }
}

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
    case UPDATE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
