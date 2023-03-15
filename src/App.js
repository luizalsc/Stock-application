import './App.css'
import { Provider } from 'react-redux'
import store from './data/store/store'
import { Home } from './pages/home'



function App() {
  return (
    <>
      <Provider store={store}>
        <Home/>
      </Provider>
    </>
  )
}

export default App
