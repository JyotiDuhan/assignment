/**
 * transformProducts
 * @param  {Array} products [description]
 * @return {Array}          [description]
 */
export function transformProducts(products) {
  const transformedProducts = products.reduce((prev, curr, index) => {
    const id = index + 1

    curr.id = id

    return {
      ...prev,
      [id] : curr
    }
  }, {})

  return transformedProducts
}

/**
 * [mapProductsByBrand description]
 * @param  {Object} products [description]
 * @return {Object}          [description]
 */
export function mapProductsByBrand({ brands, products }) {
  const filteredBrandsinfo = {}

  brands.forEach((brand) => {
    filteredBrandsinfo[brand] = products
      .filter((product) => (product.brand === brand))
      .map((product) => product.id)
  })

  return filteredBrandsinfo
}

/**
 * [mapProductByPrice description]
 * @param  {Object} options.filters  [description]
 * @param  {Array} options.products [description]
 * @return {Object}                  [description]
 */
export function mapProductByPrice({ prices, products }) {
  const byPrice = {}

  prices.forEach((price) => {
    const range = price.split('-')

    byPrice[price] = products
      .filter((product) => (product.price >= range[0] && product.price <= range[1]))
      .map((product) => product.id)
  })

  return byPrice
}

/**
 * Finds Value in Object
 * @param  {Object} object Source Object
 * @param  {String} value  Value to be found
 * @return {Boolean}       If Value is present in the object
 */
function doesValueExistInObject(object, value) {
  return Object.values(object).indexOf(value) > -1
}

/**
 * Updates products on the basis of active filters
 * @param  {Object} state Store
 * @return {Array}        List of active products
 */
export function updateProductsByActiveFilters(state) {
  const { productsMap, byBrand, byPrice, filters } = state
  const { activeFilters } = filters
  const isAnyFilterActive = doesValueExistInObject(activeFilters.brand, true) || doesValueExistInObject(activeFilters.price, true)

  if (isAnyFilterActive) {
    const active = {}

    for (const filter in activeFilters) {
      if (active[filter]) {
        active[filter].push(activeFilters[filter])
      } else {
        active[filter] = [activeFilters[filter]]
      }
    }
  }

  return Object.keys(productsMap)
}
