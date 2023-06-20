import reducer from './index'
import {
  addStocksToPortifolio,
  renderStocks,
  getStocksDetails,
  deleteSotck
} from '../actions'

describe('reducer', () => {
  const cardsInitialState = {}
  const detailsInitialState = {}
  const portfolioInitialState = []

  const initialState = {
    userStocks: portfolioInitialState,
    cardStocks: cardsInitialState,
    stockDetails: detailsInitialState
  }
  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('handles RENDER_STOCK', () => {
    const stock = { description: 'Lorem Ipsum', name: 'Test Company 3', ticker: 'TST3' }
    const expectedState = {
      userStocks: portfolioInitialState,
      cardStocks: { description: 'Lorem Ipsum', name: 'Test Company 3', ticker: 'TST3' },
      stockDetails: detailsInitialState
    }

    expect(reducer(initialState, renderStocks(stock))).toEqual(expectedState)
  })

  it('handles RENDER_STOCK_DETAILS', () => {
    const stock = { close: 100 }
    const expectedState = {
      userStocks: portfolioInitialState,
      cardStocks: cardsInitialState,
      stockDetails: { close: 100 }
    }

    expect(reducer(initialState, getStocksDetails(stock))).toEqual(expectedState)
  })

  it('handles ADD_STOCK_TO_PORTIFOLIO', () => {
    const stock = {
      cardStocks: { description: 'Lorem Ipsum', name: 'Test Company', ticker: 'TST' },
      stocksCLosePrice: { close: 100 }
    }
    const expectedState = {
      userStocks: [{ cardStocks: { description: 'Lorem Ipsum', name: 'Test Company', ticker: 'TST' }, stocksCLosePrice: { close: 100 } }],
      cardStocks: cardsInitialState,
      stockDetails: detailsInitialState
    }

    expect(reducer(initialState, addStocksToPortifolio(stock))).toEqual(expectedState)
  })

  it('handles ADD_DELETED_STOCK', () => {
    const currentPortfolio = [
      { cardStocks: { description: 'Lorem Ipsum', name: 'Test Company', ticker: 'TST' }, stocksCLosePrice: { close: 100 } },
      { cardStocks: { description: 'Lorem Ipsum dollor', name: 'Second Company', ticker: 'SC' }, stocksCLosePrice: { close: 200 } }
    ]

    const currentState = {
      userStocks: currentPortfolio,
      cardStocks: cardsInitialState,
      stockDetails: detailsInitialState
    }

    const deletedStockIndex = 0

    const expectedState = {
      userStocks: [{
        cardStocks: { description: 'Lorem Ipsum dollor', name: 'Second Company', ticker: 'SC' },
        stocksCLosePrice: { close: 200 }
      }],
      cardStocks: cardsInitialState,
      stockDetails: detailsInitialState
    }

    expect(reducer(currentState, deleteSotck(deletedStockIndex))).toEqual(expectedState)
  })
})
