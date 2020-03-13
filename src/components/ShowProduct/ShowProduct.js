import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'
import messages from '../AutoDismissAlert/messages'

const Product = (props) => {
  const [product, setProduct] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/products/${props.match.params.id}`)
      .then(res => setProduct(res.data.product))
      .catch(console.error)
  }, [])
  console.log(product)
  const destroy = () => {
    axios({
      url: `${apiUrl}/products/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!product) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      props.msgAlert({
        heading: 'Product deleted succesfully',
        message: messages.productDeleted,
        variant: 'success'
      }),
      <Redirect to={'/my-store'} />
    )
  }

  return (
    <Layout>
      <div className="product">
        <h2 className="header">{product.name}</h2>
        <h6 className="description">{product.description}</h6>
        <h6 className="price">{product.price}$</h6>
        <Button variant="danger" size="sm" onClick={destroy}>Delete Product</Button>
        <Link to={`/products/${props.match.params.id}/edit`}>
          <Button variant="primary" size="sm" style={{ marginLeft: 4 }}>Edit</Button>
        </Link>
      </div>
    </Layout>
  )
}

export default Product
