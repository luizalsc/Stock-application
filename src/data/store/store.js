import { combineReducers, createStore } from 'redux'
import portifolioReducer from './reducers/stock-portifolio'
import renderStocksReducer from './reducers/render-stock'
import renderStockDetails from './reducers/render-stock-details'
import removeStocksReducer from './reducers/remove-stocks'
import deletedStocksReducer from './reducers/deleted-stocks'
//import storage from 'redux-persist/lib/storage'
//import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    userStocks: portifolioReducer,
    cardStocks: renderStocksReducer,
    stockDetails: renderStockDetails,
    deletedStocks: deletedStocksReducer,
    chosenStocks: removeStocksReducer
})

const store = createStore(rootReducer)

export { store }

//----IMPLEMENTAR REDUX PERSIST---

// const persistConfig = {
//     key: 'root',
//     storage
// }

//const persistedReducer = persistReducer(persistConfig , rootReducer)

//const persistor = persistStore(store)

// const rootReducer = combineReducers({
//     userStocks: portifolioReducer,
//     cardStocks: renderStocksReducer,
//     stockDetails: renderStockDetails
// })

// const persistConfig = {
//     key: 'root',
//     storage
// }

// const persistedReducer = persistReducer(persistConfig , rootReducer)

// const store = createStore(persistedReducer)

// const persistor = persistStore(store)

// export { store , persistor }
