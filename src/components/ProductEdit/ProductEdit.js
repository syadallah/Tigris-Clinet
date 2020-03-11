import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ProductForm from '../Shared/ProductForm'
import Layout from '../Shared/Layout'

const ProductEdit = props => {
  const [product, setproduct] = useState({ name: '', description: '', price: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/products/${props.match.params.id}`)
      .then(res => setproduct(res.data.product))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setproduct(product => ({ ...product, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/products/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { product }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/products/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={'/products'}
      />
    </Layout>
  )
}

export default ProductEdit
