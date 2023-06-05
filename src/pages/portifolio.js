
import { StocksPortfolio } from '../components/StocksPortfolio/index'
import { PortifolioForm } from '../components/inputs/PortfolioForm/index'
import { StyledLinkTo } from '../components/StyledLinkTo/index'

function Portifolio () {
  return (
    <div className="mx-5 my-5">
      <StyledLinkTo to="/">Voltar</StyledLinkTo>
      <StocksPortfolio />
      <PortifolioForm />
    </div>
  )
}

export { Portifolio }
