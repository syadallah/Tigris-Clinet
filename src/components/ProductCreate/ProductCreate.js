import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'
import ProductForm from '../Shared/ProductForm'
import Layout from '../Shared/Layout'

const ProductCreate = props => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' })
  const [createdProductId, setCreatedProductId] = useState(null)

  const handleChange = event => {
    event.persist()
    // const updatedField = { [event.target.name]: event.target.value }
    //
    // const editedProduct = Object.assign(product, updatedField)
    //
    // setProduct(editedProduct)
    setProduct(product => ({ ...product, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/products`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { product }
    })
      .then(res => setCreatedProductId(res.data.product.id))
      .catch(console.error)
  }

  if (createdProductId) {
    return (
      props.msgAlert({
        heading: 'Product created succesfully',
        message: messages.productCreated,
        variant: 'success'
      }),
      <Redirect to={'/my-store'} />
    )
  }

  return (
    <Layout>
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default ProductCreate
