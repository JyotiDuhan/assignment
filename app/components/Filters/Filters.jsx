import React from 'react'
import * as styles from './styles.css'

/**
 * Generate Check box options for filters
 * @param  {Array}    options        List of all options to be shown for one checkbox group
 * @param  {Function} onValueChnage  Event Listener on checkbox on change
 * @param  {String}   filterName     Name of filter to track the value
 * @return {JSX}                     Rendered checkbox group
 */
function generateFilterOptions(options, onValueChnage, filterName) {
  const filterOptions = Object.keys(options)

  return filterOptions.map((option) => (
    <div key={option} className={styles['filter-option']}>
      <label>
        <input
          type='checkbox'
          value={option}
          checked={options[option] === true}
          onClick={onValueChnage}
          data-name={filterName}
          data-value={option}
        />
        <span>{option}</span>
      </label>
    </div>
  ))
}

/**
 * Map and Render Filters
 * @param  {Object}   filters        Filters Hash.
 * @param  {Function} onValueChnage  Event Listener on checkbox on change
 * @return {JSX}                     Rendered Filters
 */
function makeFilters(filters, onValueChnage) {
  const filtersNames = Object.keys(filters)

  return filtersNames.map((filter) => (
    <div className={styles['filter-unit']} key={filter}>
      <h2>{filter}</h2>
      { generateFilterOptions(filters[filter], onValueChnage, filter) }
    </div>
  ))
}

/**
 * Renders Filters Siderbar
 * @param  {Object}   options.filters        Filters Hash.
 * @param  {Function} options.onValueChnage  Event Listener on checkbox on change
 * @return {JSX}                             Rendered Filters Siderbar
 */
export default function Filters ({ filters, onValueChnage }) {
  return (
    <div className={styles.filters}>
      <form action=''>
        { makeFilters(filters, onValueChnage) }
      </form>
    </div>
  )
}
