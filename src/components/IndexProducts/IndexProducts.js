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

      productHtml = products.map(product => (
        <div className= "container" key={product.id}>
          <div className='product'>
            <h2 className='header'>{`${product.name}`}</h2>
            <h6 className='description'>{`${product.description}`}</h6>
            <h6 className='price'>{`${product.price}`} $</h6>
          </div>
        </div>
      ))
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
