import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTickers, getTickerDetails } from '../../data/services/fetch-api';
import { renderStocks } from '../../data/store/actions/render-stock';
import { getStocksDetails } from '../../data/store/actions/render-stock-details';
import { StockCard } from '../card/stock-card';

function UserForm() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    stocksTicker: '',
  });

  const handleIpuntChange = (event) => {
    setInputs({
      stocksTicker: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchData = async () => {
      const newStock = await getTickers(inputs.stocksTicker);
      const stockDetails = await getTickerDetails(inputs.stocksTicker);

      if (newStock.status === 'NOT_FOUND') {
        alert('Esta ação não existe');
        return;
      }

      dispatch(renderStocks(newStock));
      dispatch(getStocksDetails(stockDetails));
    };

    fetchData();
  };

  return (
    <div data-testid="user-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleIpuntChange}
          value={inputs.stocksTicker}
          placeholder="AAPL"
        />
        <button type="submit">
          Pesquisar
        </button>
      </form>
      <StockCard data-testid="stock-card" />
    </div>
  );
}

export { UserForm };