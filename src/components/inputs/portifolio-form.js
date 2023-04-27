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
    <>
      <form onSubmit={handleSubmit} value={portifolioInfo} role='form'>

        <label htmlFor="stocks">Selecione as ações desejadas</label>
        <br />
        <div>
          <select
            name="ticker"
            onChange={handleStockInfoChange}
            defaultValue="-Selecione-"
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
              <li>Nenhuma ação encontrada</li>
                )}
          </select>
          <span
            data-testId="error"
            style={{ visibility: error ? 'visible' : 'hidden' }}>
            Você já usou todo seu aporte
          </span>
          <input
            type="number"
            name="percentual"
            placeholder="100"
            id="number"
            onChange={handlePercentualChange}
          />
          <label htmlFor="number">%</label>
          <button
            onClick={addToPortifolio}
            type="reset"
            role="reset-add"
            value={stockInfos.ticker}
          >
            +
          </button>
          <br />
          <br />
        </div>

        <label htmlFor="contribution">Insira o valor que quer aportar</label>
        <br />
        <input
          type="number"
          onChange={handleContributionChange}
          value={contributionValue}
          placeholder="Valor total do aporte"
          id="contribution"
          name="amount"
          required
        />

        <br />
        <br />
        <button type="submit" role="submit">Calcular</button>
        <br />
        <br />
        <br />
      </form>

      <Wallet portifolioInfo={portifolio} />
      <Calculator inputsInfo={wallet} />
    </>
  )
}

PortifolioForm.propTypes = {
  contributionValue: PropTypes.object,
  portifolioInfo: PropTypes.arrayOf(PropTypes.object)
}

export { PortifolioForm }
