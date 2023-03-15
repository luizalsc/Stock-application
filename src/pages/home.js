import { UserForm } from "../data/hooks/components/inputs/user-form"
import { StocksPortifolio } from '../data/hooks/components/cards/user-cards'

const Home = () => {

    return (
        <main>
            <h1>Home</h1>
            <UserForm/>
            <StocksPortifolio/>
        </main>
    )
}

export { Home }
