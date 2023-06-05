
import { UserForm } from '../components/inputs/UserForm/index'
import { StocksPortfolio } from '../components/StocksPortfolio/index'
import { StyledLinkTo } from '../components/StyledLinkTo'

function Home () {
  return (
    <main className="m-3 sm:m-5">
      <UserForm />
      <StocksPortfolio />
      <StyledLinkTo to="/portifolio/">Ir para sua carteira</StyledLinkTo>
    </main>
  )
}

export { Home }
