export function deleteSotck(index) {
  return {
    type: 'ADD_DELETED_STOCK',
    payload: index,
  };
}
