import PropTypes from 'prop-types'

function Wallet ({ portifolioInfo }) {
  return (
    <div className="sm:col-span-1 sm:min-w-fit">
      <h1 className="text-xl font-mono h1_red">Ações escolhidas</h1>
      <div className="px-5">
        <ul className="grid sm:grid-cols-2 sm:grid-rows-5 gap-1 sm:grid-cols-1">
          {portifolioInfo.length > 0
            ? (
                portifolioInfo.map((stock) => (
              <li key={stock.stockInfos.ticker} value={stock.stockInfos.ticker} className="sm:col-span-1 sm:row-span-1 py-2 sm:py-5">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {stock.stockInfos.ticker}
                  {' '}
                  -
                  {' '}
                  {stock.percentual.percentual}
                  %
                </p>
              </li>
                ))
              )
            : (
            <li className="text-base font-sans font-semibold text-gray-700 mt-2">Aguardando escolhas</li>
              )}
        </ul>
      </div>
    </div>
  )
}

Wallet.propTypes = {
  portifolioInfo: PropTypes.arrayOf(PropTypes.object)
}

export { Wallet }
