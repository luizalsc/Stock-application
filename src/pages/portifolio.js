import { Link } from 'react-router-dom';
import { StocksPortifolio } from '../components/cards/user-cards';
import { PortifolioForm } from '../components/inputs/portifolio-form';

function Portifolio() {
  return (
    <>
      <Link to="/">Voltar</Link>
      <StocksPortifolio />
      <PortifolioForm />
    </>
  );
}

export { Portifolio };
