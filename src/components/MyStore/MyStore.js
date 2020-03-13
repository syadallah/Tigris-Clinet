import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'
import { Link } from 'react-router-dom'
class MyStore extends Component {
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
    let { products } = this.state
    let productHtml
    console.log(this.props.user.id)
    console.log(products)
    if (products) {
      products = products.filter(product => product.user_id === this.props.user.id)

      // We have products!
      if (products.length) {
        // We have products to display
        productHtml = products.map(product => (
          <div className= "container" key={product.id}>
            <div className='product'>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <h6 className='description'>{`${product.description}`}</h6>
              <h6 className='price'>{`${product.price}`} $</h6>
            </div>
          </div>
        ))
      } else {
        // We have 0 products
        productHtml =
        <div>
          <h4>Your Tigris store is empty, Please <Link to="/create-product">Add Product</Link></h4>
        </div>
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

export default MyStore
