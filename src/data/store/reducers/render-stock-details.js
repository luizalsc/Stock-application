export default function reducer (state = {}, action) {
  if (action.type === 'RENDER_STOCK_DETAILS') {
    return action.payload
  }

  return state
}
