export const ADD_DELETED_STOCK = 'ADD_DELETED_STOCK'
export const RENDER_STOCK_DETAILS = 'RENDER_STOCK_DETAILS'
export const RENDER_STOCK = 'RENDER_STOCK'
export const ADD_STOCK_TO_PORTIFOLIO = 'ADD_STOCK_TO_PORTIFOLIO'

// ---Remove-stocks---
export function deleteSotck (index) {
  return {
    type: ADD_DELETED_STOCK,
    payload: index
  }
}

// ---Render-stock-details---
export function getStocksDetails (stockDetails) {
  return {
    type: RENDER_STOCK_DETAILS,
    payload: stockDetails
  }
}

// ---Render-stock---
export function renderStocks (newStock) {
  return {
    type: RENDER_STOCK,
    payload: newStock
  }
}
// ---Stock-portfolio---
export function addStocksToPortifolio (stock) {
  return {
    type: ADD_STOCK_TO_PORTIFOLIO,
    payload: stock
  }
}
