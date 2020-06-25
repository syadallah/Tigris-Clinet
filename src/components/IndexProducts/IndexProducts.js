import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

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
          console.log(this.state)
        })
      })
      .catch(console.error)
  }

  render () {
    // Destructuring
  //  const { products } = this.state

    let productHtml
    let productHtmlSearch
    let productSearch
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
    } else {
      // We are still waiting for our state to change (api)
      productHtml = 'Loading...'
    }
    const handleChange = event => {
      this.setState({ value: event.target.value })
    }
    const handleSubmit = event => {
      console.log(this.state.value)
      productHtmlSearch = this.state.products.filter(product => product.name === this.state.value)
      if (productHtmlSearch) {
        productHtml = []
        console.log(productHtml)
        productSearch = productHtmlSearch.map(product => (
          <div key={product.id}>
            <div className='product'>
              <h2 className='header'>{`${product.name}`}</h2>
              <h6 className='description'>{`${product.description}`}</h6>
              <h6 className='price'>{`${product.price}`} $</h6>
            </div>
          </div>
        ))
      }
    }
    return (
      <Layout>
        <Form
          onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Label>Product</Form.Label>
              <Form.Control className='form'
                name="name"
                placeholder="Product"
                value={this.state.value}
                onChange={handleChange}
                type="string"
              />
              <Button variant="outline-primary" type="submit">Submit</Button>
            </Form.Group>
          </Form.Row>
        </Form>

        <ul>
          {productSearch}
          {productHtml}
        </ul>
      </Layout>
    )
  }
}
export default Products
