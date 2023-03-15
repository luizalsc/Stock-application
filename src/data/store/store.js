import { combineReducers, createStore } from 'redux'
import portifolioReducer from './reducers/stock-portifolio'
import  renderStocksReducer from './reducers/render-stock'


const rootReducer = combineReducers({
    userStocks: portifolioReducer,
    cardStocks: renderStocksReducer
})

const store = createStore(rootReducer)

export default store