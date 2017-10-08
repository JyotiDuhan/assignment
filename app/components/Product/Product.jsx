import React       from 'react'
import { NavLink } from 'react-router-dom'
import * as styles from './styles.css'

/**
 * Single Product
 * @param  {Object}    allProducts     All Products Hash
 * @param  {Array}    activeProducts  List of active products
 * @param  {Function} onAddToCart     List of active products
 * @return {JSX}                      Rendered Unordered List of active products
 */
export default function Product ({ product, onAddToCart }) {
  return (
    <div>
      <div className={styles['img-cont']}>
        <img src={`/assets/images/${product.image}`} alt={product.name} />
      </div>
      <div className='details'>
        <p className={styles['prod-name']}>
          <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
        </p>
        <p className='centered'>{product.measurement}</p>
        <p className='t-bold top-margin currency'>{product.price}</p>
        <div className='button t-upper padded-s btn' onClick={onAddToCart} data-id={product.id}>{'add to cart'}</div>
      </div>
    </div>
  )
}
