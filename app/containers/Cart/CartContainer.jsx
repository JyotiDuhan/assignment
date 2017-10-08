import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { Listing }          from '$COMPONENTS'

/**
 * Cart Container, loades Cart Page
 */
class CartContainer extends Component {
  /**
   * Update Cart on click of add to cart button
   * @param  {Event} event  Event
   */
  handleCartUpdate = () => {
    return
  }

  /**
   * Render Cart Page
   * @return {JSX} Rendered Cart
   */
  render() {
    const { cart, productsMap, message } = this.props
    const products = Object.keys(cart)

    return (
      <div>
        <Listing
          allProducts={productsMap}
          activeProducts={products}
          onAddToCart={this.handleCartUpdate}
        />
        <div className='loading'>{message}</div>
      </div>
    )
  }
}

/**
 * Avails State to render method
 * @param  {Object} options.cart  cart of State
 * @return {Object}               State fregment that is necessary to component
 */
function mapStateToProps({ cart, products }) {
  const { productsMap } = products

  return {
    cart,
    productsMap,
    message : Object.keys(cart).length === 0
      ? 'Cart is Empty.'
      : ''
  }
}

export default connect(mapStateToProps)(CartContainer)
