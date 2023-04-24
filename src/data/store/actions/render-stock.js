export function renderStocks(newStock) {
  return {
    type: 'RENDER_STOCK',
    payload: newStock,
  };
}
