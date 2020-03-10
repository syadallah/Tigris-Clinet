import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <Fragment>
    <h1>
Tigris
    </h1>
    <h1>Hppiness is
    Receving what you ordered online.
    </h1>

    <Link to="/products" className="btn btn-danger">Start Shopping</Link>
  </Fragment>
)
export default Home
