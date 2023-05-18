import { useSelector, useDispatch } from 'react-redux'
import { addStocksToPortifolio } from '../../data/store/actions/stock-portifolio'

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
    <section className="flex flex-col justify-between divide-y divide-gray-200 w-3/4  bg-gray-50 rounded-md shadow-md p-2 mx-auto my-3 ">
      <h1 className="text-xl font-semibold font-mono leading-6 text-sky-800 p-2 mt-2">{initialStock.cardStocks.name}</h1>
      <h4 className="text-base font-semibold font-mono leading-5 text-sky-800 p-2">{initialStock.cardStocks.ticker}</h4>
      <p className="text-base leading-5 text-gray-500 p-4">{initialStock.cardStocks.description}</p>
      <div className="flex justify-between p-2">
        <h4 className="text-base font-semibold font-mono leading-6 text-sky-800 self-center px-2">Preço da ação</h4>
        <p className="text-xl leading-5 text-gray-500 self-center">{initialStock.stocksCLosePrice.close}</p>
        <button onClick={handleClick} value={initialStock.cardStocks.ticker} className="self-center rounded-md bg-sky-800 w-1/3 text-base font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out  hover:scale-90 hover:bg-sky-100 hover:text-sky-800">Adicionar ação à minha carteira</button>
      </div>

    </section>
  )
}

export { StockCard }
