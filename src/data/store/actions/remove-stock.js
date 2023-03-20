//---Action necessária??---

export function deleteSotck(stockDetails) {
    return {
        type: 'ADD_DELETED_STOCK',
        payload: stockDetails
    }
}