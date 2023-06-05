import { useSelector, useDispatch } from 'react-redux'
import { addStocksToPortifolio } from '../../data/store/actions/index'
import { Button } from '../Button'

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
      <h1 className="text-xl h1_blue p-2 mt-2">{initialStock.cardStocks.name}</h1>
      <h1 className="text-base leading-5 h1_blue p-2">{initialStock.cardStocks.ticker}</h1>
      <p>{initialStock.cardStocks.description}</p>
      <div className="sm:flex sm:justify-between p-1 sm:p-2">
        <h1 className="sm:text-base text-sm  text-center h1_blue self-center px-1 py-2 sm:px-2">Preço da ação</h1>
        <p className="sm:text-xl sm:self-center sm:leading-5 text-base text-center  text-gray-500 py-2">{initialStock.stocksCLosePrice.close}</p>
        <Button onClick={handleClick} value={initialStock.cardStocks.ticker} className="sm:self-center sm:w-full sm:py-1 sm:px-4 w-full px-2 bg-sky-800  text-base text-gray-50 ring-gray-500/10 hover:scale-90 hover:bg-sky-100 hover:text-sky-800">Adicionar à minha carteira</Button>
      </div>

    </section>
  )
}

export { StockCard }
