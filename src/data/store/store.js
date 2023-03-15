import { combineReducers, createStore } from 'redux'
import portifolioReducer from './reducers/stock-portifolio'


const rootReducer = combineReducers({
    userStocks: portifolioReducer
})

const store = createStore(rootReducer)

export default store