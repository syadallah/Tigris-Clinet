import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.scss'
const Home = () => (
  <Fragment className= {styles.body}>
    <h1>
Tigris
    </h1>
    <h2>Hppiness is...
      <br></br>
    Receving what you ordered online.
    </h2>
    <Link to="/products" className="btn btn-danger">Start Shopping</Link>
  </Fragment>
)
export default Home
