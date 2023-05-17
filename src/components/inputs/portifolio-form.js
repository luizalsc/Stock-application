import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Wallet } from '../wallet'
import { Calculator, portifolioCalculator } from '../calculator'
import PropTypes from 'prop-types'

function PortifolioForm ({ contributionValue, portifolioInfo }) {
  const userStocks = useSelector((state) => state.userStocks)

  // ----Implementar um único handleChange pra todo o form, de preferência usando o redux tb
  // const [state, setState] = useState({
  //     amount:'',
  //     ticker:'',
  //     percentual:''
  // })
  // const handleChange = (event) => {
  //     const value = event.target.value
  //     setState({...state, [event.target.name]: value})
  // }
  // ----------------------------------------------------
  const [error, setError] = useState(false)

  const [wallet, setWallet] = useState([])

  const [contribution, setContribution] = useState({
    amount: ''
  })
  const [stockInfos, setStockInfos] = useState({
    ticker: '',
    price: ''
  })
  const [percentual, setPercentual] = useState({
    precentual: ''
  })
  const [portifolio, setPortifolio] = useState([])

  const handleContributionChange = (event) => {
    setContribution({ amount: event.target.value })
  }

  const handleStockInfoChange = (event) => {
    const { value } = event.target
    const price = value.split(' ')[1]
    const ticker = value.split(' ')[0]
    const total = portifolio.reduce((acc, i) => acc + parseInt(i.percentual.percentual), 0)

    setStockInfos({ ticker, price })

    if (total === 100) {
      setError(true)
      event.target.disabled = true
    }
  }

  const handlePercentualChange = (event) => {
    const percentualInput = event.target
    const previousTotalValue = portifolio.reduce((previousTotalValue, stock) => previousTotalValue + parseInt(stock.percentual.percentual), 0)
    const total = parseInt(percentualInput.value) + previousTotalValue

    if (total > 100 && previousTotalValue < 100) {
      alert(`Digite um valor inteiro até ${100 - previousTotalValue}`)
      percentualInput.value = 100 - previousTotalValue
    } else if (previousTotalValue === 100) {
      setError(true)
      percentualInput.value = 0
      percentualInput.required = false
      percentualInput.disabled = true
    }
    setError(false)
    setPercentual({ percentual: event.target.value })
  }

  const addToPortifolio = (event) => {
    const { value } = event.target
    const repeatedSotcks = portifolio.filter((item) => item.stockInfos.ticker === value)
    const previousTotalValue = portifolio.reduce((acc, i) => acc + parseInt(i.percentual.percentual), 0)
    const currentValue = previousTotalValue + parseInt(percentual.percentual)

    if (repeatedSotcks.length > 0) {
      alert(`Você já adicionou ${value}. Cada ação só pode ser adicionada uma única vez`)
      return
    }
    if (currentValue === 100) {
      setError(true)
      event.target.disabled = true
    }
    setPortifolio([...portifolio, { stockInfos, percentual }])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(false)
    const response = portifolioCalculator(contribution.amount, portifolio)
    setWallet(response)
    return (response)
  }

  return (
    <div className="grid grid-cols-3 gap-6 my-5 ">
      <div className="col-span-1 min-w-fit">
        <h1 className="text-xl font-semibold font-mono leading-6 text-red-800 bg-red-100 text-center py-1 mb-3 rounded-md">Monte sua aplicação</h1>
        <form onSubmit={handleSubmit} value={portifolioInfo} role='form' className=" flex flex-col shrink-0 px-2">
          <label htmlFor="stocks" className="text-base font-sans font-semibold text-gray-700">Selecione as ações desejadas</label>
          <div className="flex flex-col rounded-md text-sm font-semibold text-gray-700 ">
            <select
              name="ticker"
              onChange={handleStockInfoChange}
              defaultValue="-Selecione-"
              className="rounded-md px-3 py-2 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-50"
            >
              <option value="-Selecione-" disabled>-Selecione-</option>
              {userStocks.length > 0
                ? (
                    userStocks.map((stock, index) => (
                  <option key={index} value={`${stock.cardStocks.ticker} ${stock.stocksCLosePrice.close}`} name={stock.cardStocks.ticker}>
                    {stock.cardStocks.ticker}
                    {' '}
                    -{stock.stocksCLosePrice.close}
                  </option>
                    ))
                  )
                : (
                <li className="text-sm font-semibold text-gray-700">Nenhuma ação encontrada</li>
                  )}
            </select>
            <span
              data-testId="error"
              style={{ visibility: error ? 'visible' : 'hidden' }}
              className="text-xs font-sans text-red-700 pt-2">
              Você já usou todo seu aporte
            </span>
            <p className="text-sm font-sans text-gray-700 pb-2">Informe o percentual de aporte dessa ação</p>
            <div className="inline-flex items-baseline">
              <input
                type="number"
                name="percentual"
                placeholder="100"
                id="number"
                onChange={handlePercentualChange}
                className="w-full rounded-md px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-50"
              />
              <label htmlFor="number" className="p-1 ml-2 text-base font-sans text-gray-700">%</label>
            </div>
            <button
              onClick={addToPortifolio}
              type="reset"
              role="reset-add"
              value={stockInfos.ticker}
              className="rounded-md bg-gray-100 px-1 py-1 my-3 text-lg font-medium font-sans text-gray-700 ring-1 ring-inset ring-red-500/10 transition ease-in-out hover:bg-red-50 hover:text-red-700 duration-75"
            >
              Adicionar escolha
            </button>
            <label htmlFor="contribution" className="text-base font-sans font-semibold text-gray-700">Insira o valor que quer aportar</label>
            <input
              type="number"
              onChange={handleContributionChange}
              value={contributionValue}
              placeholder="Valor total do aporte"
              id="contribution"
              name="amount"
              required
              className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-50"
            />
            <button type="submit" role="submit" className="rounded-md bg-red-900 px-1 py-1 my-3 text-lg font-medium font-sans text-slate-50 ring-1 ring-inset ring-gray-500/10 transition ease-in-out hover:bg-gray-100 hover:text-red-700 duration-75">Calcular</button>
          </div>
        </form>
      </div>
      <Wallet portifolioInfo={portifolio} />
      <Calculator inputsInfo={wallet} />
    </div>
  )
}

PortifolioForm.propTypes = {
  contributionValue: PropTypes.object,
  portifolioInfo: PropTypes.arrayOf(PropTypes.object)
}

export { PortifolioForm }
