import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
const Home = () => (
  <Fragment>
    <h1>
     Tigris
    </h1>
    <h2>Hppiness is...
      <br></br>
    Receving what you
      <br></br>
    ordered online.
    </h2>
    <Link to="/products" className="btn btn-danger startShopping">Start Shopping</Link>
  </Fragment>
)
export default Home
