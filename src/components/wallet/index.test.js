import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Wallet } from '../Wallet'

describe('Renders Wallet correctly', () => {
  it('Renders default mesagem before receiving portfolio info', () => {
    const userMockPortfolio = []

    render(
      <Wallet portifolioInfo={userMockPortfolio} />
    )
    const defaultMessageElement = screen.getByText(/Aguardando escolhas/i)

    expect(defaultMessageElement).toBeInTheDocument()
  })

  it('Renders all stocks and their quantity', () => {
    const userMockPortfolio = [
      {
        stockInfos: { price: 50, ticker: 'A' },
        percentual: { percentual: 50 }
      },
      {
        stockInfos: { price: 60, ticker: 'B' },
        percentual: { percentual: 50 }
      }
    ]

    render(
      <Wallet portifolioInfo={userMockPortfolio} />
    )
    const listItemsElement = screen.getAllByRole('listitem')

    expect(listItemsElement).toHaveLength(2)
    userMockPortfolio.forEach((stockInfo) => {
      expect(screen.getByText(`${stockInfo.stockInfos.ticker} - ${stockInfo.percentual.percentual}%`)).toBeInTheDocument()
    })
  })
})
