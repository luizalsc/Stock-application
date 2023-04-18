import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { PortifolioForm } from '../data/hooks/components/inputs/portifolio-form'
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