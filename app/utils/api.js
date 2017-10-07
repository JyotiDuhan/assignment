import { get } from '$UTILS/requestHandler'

/**
 * [getProductsApi description]
 * @return {Promise} for products
 */
export function getProductsApi() {
  return get('http://localhost:3000/products/')
}

/**
 * [getFiltersApi description]
 * @return {Promise} for filters
 */
export function getFiltersApi() {
  return get('http://localhost:3000/filters/')
}
