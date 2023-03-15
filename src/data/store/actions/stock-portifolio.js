export function addStocksToPortifolio(stock) {
    return {
        type: 'ADD_STOCK_TO_PORTIFOLIO',
        payload: stock
    }
}