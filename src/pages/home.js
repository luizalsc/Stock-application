import { Link } from 'react-router-dom';
import { UserForm } from '../components/inputs/user-form';
import { StocksPortifolio } from '../components/cards/user-cards';

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <UserForm />
      <StocksPortifolio />
      <Link to="/portifolio/">Ir para sua carteira</Link>
    </main>
  );
}

export { Home };
