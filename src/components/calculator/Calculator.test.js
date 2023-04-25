import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Calculator } from './index';
import { portifolioCalculator } from './index';

describe('Renders StockCard correctly', () => {
  it('Renders all stocks and their quantity', () => {
    const userMocksWallet = [
      '8 ações da TST',
      '4 ações da THE',
      '4 ações da DED',
    ];

    render(
      <Calculator inputsInfo={userMocksWallet} />
    )

    const listItems = screen.getAllByRole('listitem')

    expect(listItems).toHaveLength(3)
    userMocksWallet.forEach((stockInfo) => {
      expect(screen.getByText(stockInfo)).toBeInTheDocument()
    })
  });

  // recommended wallet is the stocks and their quantity that the user should
  // buy so it has the desired financial assets percentage
  it('returns the recommended wallet', () => {
    const myPortifolio = [
      {
        stockInfos: { price: 50, ticker: 'A' },
        percentual: { percentual: 50 },
      },
      {
        stockInfos: { price: 60, ticker: 'B' },
        percentual: { percentual: 50 },
      },
    ];
    const amount = 1000;
    const recommendedWallet = portifolioCalculator(amount, myPortifolio);

    expect(recommendedWallet).toStrictEqual(['10 ações da A', '8 ações da B']);
  });
});
