import React, { Component }          from 'react'
import { bindActionCreators }        from 'redux'
import { connect }                   from 'react-redux'

import { Loading, Filters, Listing } from '$COMPONENTS'
import * as filterActionCreators     from '$REDUX/modules/filters'
import * as productsActionCreators   from '$REDUX/modules/products'
import * as cartActionCreators       from '$REDUX/modules/cart'

/**
 * Main Container, this will pass on all the Redux Store,
 * Router references to child elements.
 */
class MainContainer extends Component {
  /**
   * Update Cart on click of add to cart button
   * @param  {Event} event [description]
   */
  handleCartUpdate = (event) => {
    this.props.updateCart(event.target.dataset.id)
  }

  /**
   * `onClick` event listener for filter selectbox
   *
   * @param  {Event} event  Event
   */
  handleFilterValueChange = (event) => {
    const { updateActiveFilters } = this.props
    const {name, value} = event.target.dataset

    updateActiveFilters(name, value)
  }

  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    const { isFetching, productsMap, activeFilters, activeProducts } = this.props
    const shouldRenderComponent = productsMap && activeFilters && activeProducts

    return (
      isFetching
        ? <Loading pageName={'Home Page'} />
        : shouldRenderComponent
          ? (
            <div>
              <Filters
                filters={activeFilters}
                onValueChnage={this.handleFilterValueChange}
              />
              <Listing
                allProducts={productsMap}
                activeProducts={activeProducts}
                onAddToCart={this.handleCartUpdate}
              />
            </div>
          )
          : <div>{'testing'}</div>
    )
  }

  /**
    * React Lifecycle Method: Executes when redner execution is completed.
    */
  componentDidMount() {
    const { getProducts, getFilters } = this.props

    getProducts()
      .then(() => getFilters())
  }

  /**
    * React Lifecycle Method: Executes when new props are received.
    *
    * @param {Object} nextProps  updated props
    */
  componentWillReceiveProps({ activeFilters, updateActiveProducts, wasFiltersChanged }) {
    const prevFilters            = this.props.activeFilters
    const stringifyedPrevFilters = JSON.stringify(prevFilters)
    const stringifyedCurrFilters = JSON.stringify(activeFilters)
    const isFiltersDifferent     = stringifyedCurrFilters !== stringifyedPrevFilters

    if (activeFilters && wasFiltersChanged && isFiltersDifferent) {
      updateActiveProducts(null, activeFilters)
    }
  }
}

/**
 * Maps dispatch and action ceators to render method
 * @param  {function} dispatch  store's dispatch method
 * @return {object}             action creators in object
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productsActionCreators,
    ...filterActionCreators,
    ...cartActionCreators
  },
  dispatch)
}


/**
 * Avails State to render method
 * @param  {Object}  state     Full State.
 * @param  {Object}  ownProps  Testing this
 * @return {Object}            State fregment that is necessary to component.
 */
function mapStateToProps(state) {
  const { activeFilters, wasFiltersChanged } = state.filters
  const { isFetching, error, productsMap, activeProducts } = state.products

  return {
    error,
    isFetching,
    productsMap,
    activeFilters,
    activeProducts,
    wasFiltersChanged
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
