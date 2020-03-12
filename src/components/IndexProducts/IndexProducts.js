import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'
import styles from './IndexProducts.scss'

class Products extends Component {
  constructor () {
    super()

    // Useful constructors have STATE
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    // This is where the API request goes
    axios(`${apiUrl}/products`)
      .then(res => {
        this.setState({ products: res.data.products })
        console.log(this.state)
      })
      .catch(console.error)
  }

  render () {
    // Destructuring
    const { products } = this.state
    let productHtml

    if (products) {
      // We have products!
      if (products.length) {
        // We have products to display
        productHtml = products.map(product => (
          <div className= {styles.contain} key={product.id}>
            <div className={styles.product}>
              <h2 className='header'>{`${product.name}`}</h2>
              <h6 className='description'>Description{`${product.description}`}</h6>
              <h6 className='price'>Price:{`${product.price}`}$</h6>
            </div>
          </div>
        ))
      } else {
        // We have 0 products
        productHtml = 'Sorry, there\'s no products. Go make some!'
      }
    } else {
      // We are still waiting for our state to change (api)
      productHtml = 'Loading...'
    }

    return (
      <Layout>
        <ul>
          {productHtml}
        </ul>
      </Layout>
    )
  }
}

export default Products
