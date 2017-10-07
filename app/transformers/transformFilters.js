/**
 * [transformFilters description]
 * @param  {Array} filters [description]
 * @return {Object}         mappedFilters Object
 */
export function transformFilters(filters) {
  const mappedFilters = filters.reduce((prev, curr) => {
    const name = curr.name

    return {
      ...prev,
      [name] :  curr.values.reduce((prevVal, currVal) => ({
        ...prevVal,
        [currVal] : false
      }), {})
    }
  }, {})

  return mappedFilters
}
