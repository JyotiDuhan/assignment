import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as productsActionCreators from '$REDUX/modules/products'
import * as filterActionCreators from '$REDUX/modules/filters'
import { Loading } from '$COMPONENTS'

/**
 * Main Container, this will pass on all the Redux Store,
 * Router references to child elements.
 */
class MainContainer extends Component {
  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    const { props } = this
    const { isFetching, productsInfo } = props

    return (
      isFetching
        ? <Loading pageName={'Home Page'} />
        : <div>
          {productsInfo
            && <div>{'products'}
            </div>
          }
        </div>
    )
  }

  /**
    * React Lifecycle Method: Executes when redner execution is completed.
    */
  componentDidMount() {
    const { props } = this
    const { getProducts, getFilters } = props

    getProducts()
      .then(() => getFilters())
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
    ...filterActionCreators
  },
  dispatch)
}


/**
 * Avails State to render method
 * @param  {Object}  state  Full State.
 * @return {Object}         State fregment that is necessary to component.
 */
function mapStateToProps({ products }) {
  const { isFetching, error, productsInfo } = products

  return {
    productsInfo,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
