import {
  RENDER_STOCK_DETAILS,
  RENDER_STOCK,
  ADD_STOCK_TO_PORTIFOLIO,
  ADD_DELETED_STOCK
} from '../actions'
import { combineReducers } from 'redux'

export function renderDetailsReducer (state = {}, action) {
  if (action.type === RENDER_STOCK_DETAILS) {
    return action.payload
  }

  return state
}

export function renderStocksReducer (state = {}, action) {
  if (action.type === RENDER_STOCK) {
    return action.payload
  }
  return state
}

export function portfolioReducer (state = [], action) {
  switch (action.type) {
    case ADD_STOCK_TO_PORTIFOLIO: {
      return [...state, action.payload]
    }
    case ADD_DELETED_STOCK: {
      return [...state.filter((stock, index) => index !== action.payload)]
    }
  }

  return state
}

const rootReducer = combineReducers({
  userStocks: portfolioReducer,
  cardStocks: renderStocksReducer,
  stockDetails: renderDetailsReducer
})

export default rootReducer
