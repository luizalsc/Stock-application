import { useDispatch } from 'react-redux'
import { getTickers, getTickerDetails } from '../../../data/services/Polygon-API/index'
import { renderStocks, getStocksDetails } from '../../../data/store/actions/index'
import { StockCard } from '../../StockCard/index.js'
import { useState } from 'react'

function UserForm () {
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    stocksTicker: ''
  })
  const [error, setError] = useState(false)

  const handleIpuntChange = (event) => {
    setInputs({
      stocksTicker: event.target.value.toUpperCase()
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const fetchData = async () => {
      const newStock = await getTickers(inputs.stocksTicker)
      const stockDetails = await getTickerDetails(inputs.stocksTicker)

      if (newStock.status === 'NOT_FOUND') {
        setError(true)
        return
      }
      setError(false)
      dispatch(renderStocks(newStock))
      dispatch(getStocksDetails(stockDetails))
    }

    fetchData()
  }

  return (
    <div
      data-testid="user-form"
      className="flex flex-col">
      <span
        data-testid="error"
        style={{ visibility: error ? 'visible' : 'hidden' }}
        className="self-center text-sm font-sans text-red-700">
          Esta ação não existe, pesquise uma sigla válida.
        </span>
      <form onSubmit={handleSubmit} className="self-center">
        <input
          type="text"
          onChange={handleIpuntChange}
          value={inputs.stocksTicker}
          placeholder="AAPL"
          className="rounded-md px-3 py-1.5 mr-3 mt-1 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-50"
        />
        <button
          type="submit"
          className="self-center rounded-md bg-sky-800 px-1 py-1 w-32 text-base font-sans text-gray-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out hover:bg-sky-100 hover:text-sky-800">
          Pesquisar
        </button>
      </form>
      <StockCard />
    </div>
  )
}

export { UserForm }
