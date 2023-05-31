import PropTypes from 'prop-types'

function Calculator (props) {
  const usersWallet = props.inputsInfo
  return (
    <div className="col-span-1 min-w-fit">
      <h1 className="text-xl font-semibold font-mono leading-6 text-red-800 bg-red-100 text-center py-1 rounded-md">Compra sugerida</h1>
      {usersWallet.length > 0
        ? (
            <div className="px-2">
              <p className="text-base mt-3 font-sans font-semibold text-gray-700">Você deve comprar:</p>
              <ul className="grid sm:grid-cols-2 md:grid-rows-5 gap-3 md:gap-1 divide-y divide-gray-100">
                {usersWallet.map((units, index) => (
                  <li key={index} className="sm:py-5">
                    <p className="text-sm font-semibold text-gray-900">{units}</p>
                  </li>
                ))}
              </ul>
            </div>
          )
        : (<div>
            <p className="text-base font-sans font-semibold text-gray-700 mt-2">Aguardando cálculo</p>
          </div>)}
    </div>
  )
}

export function portfolioCalculator (amount, portifolio) {
  const response = portifolio.map((stock) => (
    (parseInt(amount) * parseInt(stock.percentual.percentual) / 100) / parseInt(stock.stockInfos.price)))
  const result = response.map((stocksUnits) => parseInt(stocksUnits))
  const tickers = portifolio.map((stock) => stock.stockInfos.ticker)

  const finalResult = tickers.map((e, i) => `${result[i]} ações da ${e}`)

  return (finalResult)
}

Calculator.propTypes = {
  inputsInfo: PropTypes.arrayOf(PropTypes.string)
}

export { Calculator }
