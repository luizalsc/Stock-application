export default function reducer(state = {}, action) {
  if (action.type === 'RENDER_STOCK') {
    return action.payload;
  }
  return state;
}
