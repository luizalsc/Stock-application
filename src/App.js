import './App.css'
import { Provider } from 'react-redux'
import { store, persistor } from './data/store/store'
import { Home } from './pages/home'
import { PersistGate } from 'redux-persist/integration/react'
import { AppRoutes } from './pages/routes'



function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

{/* <>
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <Home/>
  </PersistGate>
</Provider>
</> */}
