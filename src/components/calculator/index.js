function Calculator(props) {
  const usersWallet = props.inputsInfo;
  return (
    <div>
      {usersWallet.length > 0 ? (
        <>
          <p>Você deve comprar:</p>
          <ul>
            {usersWallet.map((units, index) => (
              <li key={index}>
                <p>{units}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (<></>)}
    </div>
  );
}

export function portifolioCalculator(amount, portifolio) {
  const response = portifolio.map((stock) => (
    (parseInt(amount) * parseInt(stock.percentual.percentual) / 100) / parseInt(stock.stockInfos.price)));
  const result = response.map((stocksUnits) => parseInt(stocksUnits));
  const tickers = portifolio.map((stock) => stock.stockInfos.ticker);

  const finalResult = tickers.map((e, i) => `${result[i]} ações da ${e}`);

  return (finalResult);
}

export { Calculator };
