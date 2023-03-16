export function getStocksDetails(stockDetails) {
    return {
        type: 'RENDER_STOCK_DETAILS',
        payload: stockDetails
    }
}