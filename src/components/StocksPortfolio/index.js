import { useDispatch, useSelector } from 'react-redux'
import { deleteSotck } from '../../data/store/actions/index'
import { Button } from '../Button'

function StocksPortfolio () {
  const userStocks = useSelector((state) => state.userStocks)
  const dispatch = useDispatch()

  return (
    <div className="m-auto">
      <h1 className="text-2xl h1_blue p-2 mt-2">Carteira de Ações</h1>
      <ul className="flex place-content-center flex-wrap py-1 px-1">
        {userStocks.length > 0
          ? (
              userStocks.map((stock, index) => (
            <li key={stock.name} name={stock.name} role="heading3" className="flex flex-col justify-between divide-y divide-sky-200 w-72 bg-sky-50 rounded-md shadow-md p-3 my-2 sm:m-5 ">
              <h3 className="text-base font-semibold font-mono leading-6 text-sky-800 p-2">
                {stock.cardStocks.name}
                {' '}
              </h3>
              <p className="text-xs leading-5 text-gray-500 p-2">
                {stock.cardStocks.ticker}
                {' '}
                -
                {' '}
                {stock.cardStocks.sic_description}
              </p>
              <p className="text-base leading-5 text-gray-500 p-2">{stock.stocksCLosePrice.close}</p>
              <Button onClick={() => { dispatch(deleteSotck(index)) }} className="self-start bg-sky-800 px-1 py-1 mt-2 w-24 text-xs font-medium text-gray-50 ring-gray-500/10 hover:bg-gray-100 hover:text-sky-800 duration-75">Remover ação</Button>
            </li>
              ))
            )
          : (
          <li className="w-full">
            <p className="text-sm leading-5 text-gray-500 text-left px-2 py-4">Nenhuma ação encontrada</p>
          </li>
            )}
      </ul>
    </div>
  )
}

export { StocksPortfolio }
