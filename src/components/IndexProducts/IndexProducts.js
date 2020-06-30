import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import './IndexProducts.css'

class Products extends Component {
  constructor () {
    super()
    // Useful constructors have STATE
    this.state = {
      products: null,
      value: []
    }
  }

  componentDidMount () {
    // This is where the API request goes
    axios(`${apiUrl}/products`)
      .then(res => {
        this.setState({ products: res.data.products }, () => {
        })
      })
      .catch(console.error)
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
    let productSearch
    if (this.state.value) {
      productSearch = this.state.products.filter(product => (
        product.name === (event.target.value)
      ))
      console.log(this.state.value)
      console.log(productSearch)
      return productSearch
    }
  }
  render () {
    // Destructuring
  //  const { products } = this.state
    let productHtml

    if (this.state.products) {
      // We have products!

      productHtml = this.state.products.map(product => (
        <div className= "container" key={product.id}>
          <div className='product'>
            <h2 className='header'>{`${product.name}`}</h2>
            <h6 className='description'>{`${product.description}`}</h6>
            <h6 className='price'>{`${product.price}`} $</h6>
          </div>
        </div>
      ))
    } else if (productSearch) {
      productSearched = productSearch.map(product => (
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
        <Form className='searchForm'>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Control className='form'
                name="name"
                placeholder="Search Products.."
                value={this.state.value}
                onChange={this.handleChange}
                type="string"
              />
            </Form.Group>
          </Form.Row>
        </Form>
        <ul>
          {productHtml}
        </ul>
      </Layout>
    )
  }
}
export default Products
