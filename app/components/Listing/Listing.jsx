import React       from 'react'
import Product     from '../Product/Product'
import * as styles from './styles.css'

/**
 * Generate Products list
 * @param  {Object}   allProducts     All Products Hash
 * @param  {Array}    activeProducts  List of active products
 * @param  {Function} onAddToCart     List of active products
 * @return {JSX}                      Rendered List of active products
 */
function generateProductsList (allProducts, activeProducts, onAddToCart) {
  return (
    activeProducts.map((product) => (
      <li className={styles['prod-unit']} key={product}>
        <Product product={allProducts[product]} onAddToCart={onAddToCart} />
      </li>
    ))
  )
}

/**
 * List Container component
 * @param  {Object}    allProducts     All Products Hash
 * @param  {Array}    activeProducts  List of active products
 * @param  {Function} onAddToCart     List of active products
 * @return {JSX}                      Rendered Unordered List of active products
 */
export default function Listing ({ allProducts, activeProducts, onAddToCart }) {
  return (
    <div className='prods-cont'>
      <ul>
        { generateProductsList(allProducts, activeProducts, onAddToCart) }
      </ul>
    </div>
  )
}
