import { useDispatch } from 'react-redux'
import { getTickers, getTickerDetails } from '../../../data/services/Polygon-API/index'
import { renderStocks, getStocksDetails } from '../../../data/store/actions/index'
import { StockCard } from '../../StockCard/index.js'
import { useState } from 'react'
import { Button } from '../../Button'

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
      <form onSubmit={handleSubmit} className="self-center flex">
        <input
          type="text"
          onChange={handleIpuntChange}
          value={inputs.stocksTicker}
          placeholder="SIGLA"
          className="rounded-md px-3 py-1 mr-3 mt-1 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-50"
        />
        <Button
          type="submit"
          className="self-center bg-sky-800 px-1 py-1 mt-1 w-36 text-sm text-gray-50 ring-gray-500/10 hover:bg-sky-100 hover:text-sky-800">
          Pesquisar
        </Button>
      </form>
      <StockCard />
    </div>
  )
}

export { UserForm }
