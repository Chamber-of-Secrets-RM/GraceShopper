import axios from 'axios'

/**
 * Action Types
 */
const SET_TAGS = 'SET_TAGS'
/**
 * Action Creators
 */
export const setTags = tags => ({
  type: SET_TAGS,
  tags
})

/**
 * Thunk Creators
 */

export function fetchTags() {
  return async function(dispatch) {
    try {
      const {data: tags} = await axios.get('/api/tags')
      dispatch(setTags(tags))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */

const initialState = []

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      return action.tags
    default:
      return state
  }
}
