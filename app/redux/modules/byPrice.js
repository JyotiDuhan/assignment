import { mapProductByPrice } from '$TRANSFORMERS'

/**
 * [byPrice description]
 * @param  {Object} state  [description]
 * @param  {Object} action UPDATE_PRODUCTS_BY_FILTERS Action
 * @return {Object}        state
 */
export function byPrice(state = {}, action) {
  const options = {
    UPDATE_PRODUCTS_BY_FILTERS : () => {
      const prices = Object.keys(action.filters.price)
      const products = action.products

      return {
        ...state,
        ...mapProductByPrice({prices, products})
      }
    }
  }

  return (action.type && options[action.type]) ? options[action.type]() : state
}
