import { Link } from 'react-router-dom'
import { StocksPortifolio } from '../components/cards/user-cards'
import { PortifolioForm } from '../components/inputs/portifolio-form'

function Portifolio () {
  return (
    <div className="mx-5 my-5">
      <Link to="/" className="rounded-md bg-sky-800 px-2 py-2 text-lg font-medium font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out hover:bg-gray-100 hover:text-sky-800 duration-75">Voltar</Link>
      <StocksPortifolio />
      <PortifolioForm />
    </div>
  )
}

export { Portifolio }
