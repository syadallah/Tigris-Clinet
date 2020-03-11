import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

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
          <li key={product.id}>
            <h4>{`${product.name}`}</h4>
            <h4>Price:{`${product.price}`}$</h4>
            <h5>Description{`${product.description}`}</h5>
          </li>
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
        <h4>Products Page</h4>
        <ul>
          {productHtml}
        </ul>
      </Layout>
    )
  }
}

export default Products
