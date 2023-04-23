import {StocksPortifolio} from '../components/cards/user-cards'
import { PortifolioForm } from '../components/inputs/portifolio-form'
import { Link } from 'react-router-dom'

const Portifolio = () => {
    return(
        <>
            <Link to={`/`}>Voltar</Link>
            <StocksPortifolio/>
            <PortifolioForm/>
        </>
    )
}

export { Portifolio}