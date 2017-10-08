import React, { Component }          from 'react'
import { connect }                   from 'react-redux'
import { bindActionCreators }        from 'redux'

import { ProductDetails }            from '$COMPONENTS'
import * as filterActionCreators     from '$REDUX/modules/filters'
import * as productsActionCreators   from '$REDUX/modules/products'
import * as cartActionCreators       from '$REDUX/modules/cart'

/**
 * Details Container, loades Product Details Page
 */
class ProductDetailsContainer extends Component {
  /**
   * Update Cart on click of add to cart button
   * @param  {Event} event [description]
   */
  handleCartUpdate = (event) => {
    this.props.updateCart(event.target.dataset.id)
  }

  /**
   * React Lifecycle Event: Renders List Page View
   * @return {JSX}  Calls List Component to Render the page
   */
  render() {
    if (Object.keys(this.props.productsMap).length === 0) {
      return (
        <div className='loading'>{'Loading...'}</div>
      )
    }

    return (
      <ProductDetails
        product={this.props.productsMap[this.props.match.params.prodID]}
        onCartUpdate={this.handleCartUpdate}
      />
    )
  }

  /**
   * React Lifecycle Event: Runs only once, will be triggered when component is rendered.
   * will be used to fetch and format the products.
   */
  componentDidMount() {
    if (Object.keys(this.props.productsMap).length === 0) {
      const { getProducts } = this.props

      getProducts()
    }
  }
}

/**
 * Avails State to render method
 * @param  {Object} options.products    allProducts of State
 * @return {Object}                      State fregment that is necessary to component
 */
function mapStateToProps({ products }) {
  const { productsMap } = products

  return {
    productsMap
  }
}

/**
 * Maps dispatch and action ceators to render method
 * @param  {function} dispatch - store's dispatch method
 * @return {object}            - action creators in object
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productsActionCreators,
    ...filterActionCreators,
    ...cartActionCreators
  },
  dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsContainer)
