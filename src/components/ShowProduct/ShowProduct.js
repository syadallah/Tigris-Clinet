import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

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
    return <Redirect to={
      { pathname: '/my-store', state: { msg: 'Product succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{product.name}</h4>
      <p>Price: {product.price}$</p>
      <p>Description: {product.description}</p>
      <button onClick={destroy}>Delete Product</button>
      <Link to={`/products/${props.match.params.id}/edit`}>
        <button>Edit</button>
        <br></br>
        <br></br>
      </Link>
      <Link to="/products">See more products</Link>
    </Layout>
  )
}

export default Product
