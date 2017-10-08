import { mapProductsByBrand } from '$TRANSFORMERS'

/**
 * /
 * @param  {Array}  state  [description]
 * @param  {Object} action [description]
 * @return {Array}        return productByIds updated state
 */
export function byBrands(state = {}, action) {
  const options = {
    UPDATE_PRODUCTS_BY_FILTERS : () => {
      const brands = Object.keys(action.filters.brands)
      const products = action.products

      return {
        ...state,
        ...mapProductsByBrand({brands, products})
      }
    }
  }

  return (action.type && options[action.type]) ? options[action.type]() : state
}
