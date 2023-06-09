import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Wallet } from '../../Wallet'
import { Calculator, portfolioCalculator } from '../../Calculator/index'
import PropTypes from 'prop-types'
import { Button } from '../../Button'

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
    const response = portfolioCalculator(contribution.amount, portifolio)
    setWallet(response)
    return (response)
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-6 my-5 ">
      <div className="sm:col-span-1 min-w-fit">
        <h1 className="text-xl h1_red mb-3">Monte sua aplicação</h1>
        <form onSubmit={handleSubmit} value={portifolioInfo} role='form' className=" flex flex-col shrink-0 px-2">
          <label htmlFor="contribution">Insira o valor total que deseja aportar</label>
              <input
                type="number"
                onChange={handleContributionChange}
                value={contributionValue}
                placeholder="Valor total do aporte"
                role="contribution"
                name="amount"
                required
                className="rounded-md px-3 py-2.5 mb-5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />
          <label htmlFor="stocks">Selecione a ação desejada</label>
          <div className="flex flex-col rounded-md text-sm font-semibold text-gray-700 ">
            <select
              name="stocks"
              onChange={handleStockInfoChange}
              defaultValue="-Selecione-"
              className="rounded-md px-3 py-2 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
              role="error"
              style={{ visibility: error ? 'visible' : 'hidden' }}
              className="text-xs font-sans text-red-700 pt-2">
              Você já usou todo seu aporte
            </span>
            <label htmlFor='number'>Insira o percentual de aporte da ação escolhida</label>
            <div className="inline-flex items-baseline">
              <input
                type="number"
                name="percentual"
                role="percentual"
                placeholder="100"
                id="number"
                onChange={handlePercentualChange}
                className="w-full rounded-md px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />
              <label htmlFor="number" className="pl-1">%</label>
            </div>
            <Button
              onClick={addToPortifolio}
              type="reset"
              role="reset-add"
              value={stockInfos.ticker}
              className="bg-gray-100 px-3 py-1 w-full my-3 text-lg text-xs text-gray-700 ring-red-500/10 hover:bg-red-50 hover:text-red-700 duration-75"
            >
              Adicionar esta escolha
            </Button>

            <Button
              type="submit"
              role="submit"
              className="bg-red-900 w-full px-1 py-1 my-3 text-lg font-medium text-slate-50 ring-gray-500/10 hover:bg-gray-100 hover:text-red-700 duration-75">
                Calcular
            </Button>
          </div>
        </form>
      </div>
      <Wallet portifolioInfo={portifolio} />
      <Calculator usersWallet={wallet} />
    </div>
  )
}

PortifolioForm.propTypes = {
  contributionValue: PropTypes.object,
  portifolioInfo: PropTypes.arrayOf(PropTypes.object)
}

export { PortifolioForm }
