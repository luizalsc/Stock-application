import { combineReducers, createStore } from 'redux'
import portifolioReducer from './reducers/stock-portifolio'
import  renderStocksReducer from './reducers/render-stock'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    userStocks: portifolioReducer,
    cardStocks: renderStocksReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['renderStocksReducer']
}

const persistedReducer = persistReducer(persistConfig , rootReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export { store , persistor }