/**
 * Acrion Creator: To Update The Cart
 * @param  {String} id    Product ID of product to beremoved or added
 * @param  {String} flag  Whether to remove or add the product
 * @return {Object}       Action
 */
export function updateCart(id) {
  return {
    type : 'UPDATE_CART',
    id
  }
}

/**
 * Reducer: Updates `cart` part of main state.
 * @param  {Object} state   `cart` part of state
 * @param  {Object} action   Action
 * @return {Object}         Updated state.
 */
export default function cart(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_CART':
    return {
      ...state,
      [action.id] : true
    }

  default:
    return state
  }
}
