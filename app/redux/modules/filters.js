import { getFiltersApi } from '$UTILS/api'
import { transformFilters, updateProductsByActiveFilters } from '$TRANSFORMERS'
import { updateProductsByFilters, updateActiveProducts } from './products'

const FETCHING_FILTERS = 'FETCHING_FILTERS'
const FETCHING_FILTERS_SUCCESS = 'FETCHING_FILTERS_SUCCESS'
const FETCHING_FILTERS_FAILURE = 'FETCHING_FILTERS_FAILURE'
const UPDATE_ACTIVE_FILTERS = 'UPDATE_ACTIVE_FILTERS'

/**
 * [fetchFilters description]
 * @return {Object} fetchFilters Action
 */
function fetchFilters() {
  return {
    'type' : FETCHING_FILTERS
  }
}

/**
 * Action Creator: On Filter fetch success
 * @param  {Array} filtersInfo  Filters Data
 * @return {Object}             FETCHING_FILTERS_SUCCESS Action
 */
function fetchFiltersSuccess(filtersInfo) {
  return {
    'type' : FETCHING_FILTERS_SUCCESS,
    filtersInfo
  }
}

/**
 * Action Creator: On Filter fetch error
 * @param  {Object} error Error Details(optional)
 * @return {Object}       FETCHING_FILTERS_FAILURE Action
 */
function fetchFiltersFailure(error) {
  return {
    'type' : FETCHING_FILTERS_FAILURE,
    error
  }
}

/**
 * Action Creator: Updates Active Filters
 * @param  {String} filterName     Filter Name to be updated
 * @param  {String} filterValue    Which part of filter to be updated
 * @return {Object}                UPDATE_ACTIVE_FILTERS Action
 */
export function updateActiveFilters(filterName, filterValue) {
  return {
    'type' : UPDATE_ACTIVE_FILTERS,
    filterName,
    filterValue
  }
}

/**
 * [getFilters description]
 * @return {Promise}          getFilters promise
 */
export function getFilters() {
  return (dispatch) => {
    dispatch(fetchFilters())
    getFiltersApi()
      .then(({data}) => {
        const formattedFilters = transformFilters(data)

        dispatch(fetchFiltersSuccess(formattedFilters))
        dispatch(updateProductsByFilters(formattedFilters))
      })
      .catch((error) => dispatch(fetchFiltersFailure(error)))
  }
}

/**
 * Toggles Filter Value on check/uncheck of filter
 * @param  {Object} state  activeFilter of filters in store
 * @param  {Object} action action
 * @return {Object}        Updated activeFilter
 */
function toggleFilters(state = {}, action) {
  const options = {
    'UPDATE_ACTIVE_FILTERS' : () => {
      const {filterName, filterValue} = action

      return {
        ...state,
        [filterName] :  {
          ...state[filterName],
          [filterValue] : !state[filterName][filterValue]
        }
      }
    }
  }

  return action.type && options[action.type] ? options[action.type]() : state
}

const initialState = {
  isFetching : false,
  error      : ''
}

/**
 * [filters description] filters reducers
 * @param  {Object} state  initialState
 * @param  {Object} action Action
 * @return {Object}        state object
 */
export default function filters(state = initialState, action) {
  const options = {
    'FETCHING_FILTERS' : () => ({
      ...state,
      isFetching : true
    }),
    'FETCHING_FILTERS_SUCCESS' : () => ({
      ...state,
      isFetching    : false,
      activeFilters : action.filtersInfo
    }),
    'FETCHING_FILTERS_FAILURE' : () => ({
      ...state,
      isFetching : false,
      error      : action.error
    }),
    'UPDATE_ACTIVE_FILTERS' : () => ({
      ...state,
      activeFilters : toggleFilters(state.activeFilters, action)
    })
  }

  return action.type && options[action.type] ? options[action.type]() : state
}
