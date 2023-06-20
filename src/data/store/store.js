import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['portifolioReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)

const persistor = persistStore(store)

export { store, persistor }
