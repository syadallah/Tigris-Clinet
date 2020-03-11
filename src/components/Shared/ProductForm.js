import React from 'react'

const ProductForm = ({ product, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>Product</label>
    <input
      name="name"
      placeholder="Product"
      value={product.name}
      onChange={handleChange}
      type="string"
    />
    <label>Description</label>
    <input
      name="description"
      value={product.description}
      onChange={handleChange}
      type="text"
    />
    <label>Price</label>
    <input
      name="price"
      value={product.price}
      onChange={handleChange}
      type="decimal"
    />
    <button type="submit">Submit</button>
  </form>
)

export default ProductForm
