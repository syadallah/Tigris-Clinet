import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      })
      .catch(console.error)
  }

  render () {
    // Destructuring
    const { products } = this.state
    let productHtml

    if (products) {
      // We have movies!
      if (products.length) {
        // We have movies to display
        productHtml = products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))
      } else {
        // We have 0 movies
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
