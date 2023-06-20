import * as actions from './index'

describe('actions', () => {
  describe('returns the correct action when', () => {
    it('deletes a stock', () => {
      const index = 1
      const expectedAction = { type: actions.ADD_DELETED_STOCK, payload: index }

      expect(actions.deleteSotck(index)).toEqual(expectedAction)
    })

    it('renders the stock details', () => {
      const stockDetails = { data: {} }
      const expectedAction = { type: actions.RENDER_STOCK_DETAILS, payload: stockDetails }

      expect(actions.getStocksDetails(stockDetails)).toEqual(expectedAction)
    })

    it('renders the stock', () => {
      const newStock = { data: {} }
      const expectedAction = { type: actions.RENDER_STOCK, payload: newStock }

      expect(actions.renderStocks(newStock)).toEqual(expectedAction)
    })

    it('adds a stock to portfolio', () => {
      const stock = { data: {} }
      const expectedAction = { type: actions.ADD_STOCK_TO_PORTIFOLIO, payload: stock }

      expect(actions.addStocksToPortifolio(stock)).toEqual(expectedAction)
    })
  })
})
