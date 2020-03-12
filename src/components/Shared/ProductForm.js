import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap'

const ProductForm = ({ product, handleChange, handleSubmit }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form style={{ color: '#000' }}
        onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product</Form.Label>
            <Form.Control
              name="name"
              placeholder="Product"
              value={product.name}
              onChange={handleChange}
              type="string"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              placeholder="$"
              value={product.price}
              onChange={handleChange}
              type="decimal"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="PLease write a product description..."
            value={product.description}
            onChange={handleChange}
            type="text"
            as="textarea"
            rows="3" />
        </Form.Group>
        <Button variant="outline-primary" type="submit">Submit</Button>
      </Form>
    </div>
  </div>

)

export default ProductForm
