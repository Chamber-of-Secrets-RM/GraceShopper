import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import singleProductReducer from './single-product'
import orderReducer from './order'
import orderHistoryReducer from './orderHistory'
import tagsReducer from './tags'

const reducer = combineReducers({
  user: user,
  products: productsReducer,
  singleProduct: singleProductReducer,
  order: orderReducer,
  orderHistory: orderHistoryReducer,
  tags: tagsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
