import { useDispatch, useSelector } from 'react-redux'
import { deleteSotck } from '../../data/store/actions/remove-stock'

function StocksPortifolio () {
  const userStocks = useSelector((state) => state.userStocks)
  const dispatch = useDispatch()

  return (
    <div className="m-auto">
      <h1 className="text-2xl font-semibold font-mono leading-6 text-sky-800 p-2 mt-2">Carteira de Ações</h1>
      <ul className="flex place-content-center flex-wrap py-1 px-1">
        {userStocks.length > 0
          ? (
              userStocks.map((stock, index) => (
            <li key={index} name={stock.name} role="heading3" className="flex flex-col justify-between divide-y divide-sky-200 w-72 bg-sky-50 rounded-md shadow-md p-3 my-2 sm:m-5 ">
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
              <button onClick={() => { dispatch(deleteSotck(index)) }} className="self-start rounded-md bg-sky-800 px-1 py-1 w-24 text-xs font-medium font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 hover:text-sky-800 duration-75">Remover ação</button>
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

export { StocksPortifolio }
