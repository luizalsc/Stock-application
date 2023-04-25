import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Calculator } from './index';
import { portifolioCalculator } from './index';

describe('Renders StockCard correctly', () => {

    it('Renders result after receiving arguments', ()=> {
        const userMocksWallet = [
            '8 ações da TST',
            '4 ações da THE',
            '4 ações da DED',
          ];

        render(
            <Provider>
                <Calculator inputsInfo={userMocksWallet}/>
            </Provider>
        )

        const listItems = screen.getAllByRole('listitem')

        expect(listItems).toHaveLength(3)
        expect(listItems).toContainEqual('4 ações da DED')

    })

  it('Calculator is working', () => {
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
    const result = portifolioCalculator(amount, myPortifolio);

    expect(result).toStrictEqual(['10 ações da A', '8 ações da B']);
  });
});

// npm test --src/components/calculator/Calculator.test.js