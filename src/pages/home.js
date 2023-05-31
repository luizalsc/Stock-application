import { Link } from 'react-router-dom'
import { UserForm } from '../components/inputs/UserForm/index'
import { StocksPortifolio } from '../components/StocksPortfolio/index'

function Home () {
  return (
    <main className="m-3 sm:m-5">
      <UserForm />
      <StocksPortifolio />
      <Link to="/portifolio/" className="rounded-md bg-sky-800 px-2 py-2 text-lg font-medium font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out hover:bg-gray-100 hover:text-sky-800 duration-75">Ir para sua carteira</Link>
    </main>
  )
}

export { Home }
