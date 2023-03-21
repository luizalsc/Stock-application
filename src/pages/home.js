import { UserForm } from "../data/hooks/components/inputs/user-form"
import { StocksPortifolio } from '../data/hooks/components/cards/user-cards'
import { Link } from "react-router-dom"

const Home = () => {

    return (
        <main>
            <h1>Home</h1>
            <UserForm/>
            <StocksPortifolio/>
            <Link to={`/portifolio/`}>Ir para sua carteira</Link>
        </main>
    )
}

export { Home }
