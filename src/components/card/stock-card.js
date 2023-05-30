import { useSelector, useDispatch } from 'react-redux'
import { addStocksToPortifolio } from '../../data/store/actions/index'

function StockCard () {
  const initialStock = {
    cardStocks: useSelector((state) => state.cardStocks.results),
    stocksCLosePrice: useSelector((state) => state.stockDetails)
  }
  const userStocks = useSelector((state) => state.userStocks)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    const { value } = event.target
    const repeatedSotcks = userStocks.filter((item) => item.cardStocks.ticker === value)
    if (repeatedSotcks.length > 0) {
      alert(`Você já adicionou ${value} à sua carteira. Cada ação só pode ser adicionada uma única vez`)
      return
    }
    dispatch(addStocksToPortifolio(initialStock))
  }

  if (initialStock.cardStocks === undefined) {
    return (
      <p className="text-2xl text-center font-semibold font-mono leading-6 text-sky-800 p-2 mt-2">Pesquise uma sigla de ação</p>
    )
  }
  return (
    <section className="flex flex-col justify-between divide-y divide-gray-200 sm:w-3/4  bg-gray-50 rounded-md shadow-md p-2 mx-auto my-3">
      <h1 className="text-xl font-semibold font-mono leading-6 text-sky-800 p-2 mt-2">{initialStock.cardStocks.name}</h1>
      <h4 className="text-base font-semibold font-mono leading-5 text-sky-800 p-2">{initialStock.cardStocks.ticker}</h4>
      <p className="sm:text-base text-xs leading-5 text-gray-500 p-4">{initialStock.cardStocks.description}</p>
      <div className="sm:flex sm:justify-between p-1 sm:p-2">
        <h4 className="sm:text-base text-sm  text-center font-semibold font-mono leading-6 text-sky-800 self-center px-1 py-2 sm:px-2">Preço da ação</h4>
        <p className="sm:text-xl sm:self-center sm:leading-5 text-base text-center  text-gray-500 py-2">{initialStock.stocksCLosePrice.close}</p>
        <button onClick={handleClick} value={initialStock.cardStocks.ticker} className="sm:self-center sm:w-1/3 w-full px-2 rounded-md bg-sky-800  text-base font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out  hover:scale-90 hover:bg-sky-100 hover:text-sky-800">Adicionar ação à minha carteira</button>
      </div>

    </section>
  )
}

export { StockCard }
